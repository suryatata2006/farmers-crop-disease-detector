import os
import uuid
import json
from datetime import datetime
from typing import List

from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from PIL import Image

from app.models import init_db, get_db, ScanHistory
from app.inference import predictor
from app.schemas import PredictionResponse, ScanHistoryItem, StatsResponse, HealthResponse, ChatRequest, ChatResponse
from app.disease_data import DISEASE_KNOWLEDGE_BASE
from app.chatbot import farmer_bot

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(BASE_DIR)

UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")
SAMPLES_DIR = os.path.join(PROJECT_ROOT, "sample_images")
os.makedirs(UPLOADS_DIR, exist_ok=True)
os.makedirs(SAMPLES_DIR, exist_ok=True)

app = FastAPI(
    title="Farmers Smart Crop Disease Detector API",
    description="FastAPI Backend for Plant Disease Detection, Symptoms, and Agricultural Guidance",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")
if os.path.exists(SAMPLES_DIR):
    app.mount("/samples", StaticFiles(directory=SAMPLES_DIR), name="samples")

@app.on_event("startup")
def startup_event():
    init_db()
    print("Database initialized successfully.")
    print("Predictor ready status:", predictor.is_ready)

@app.get("/api/health", response_model=HealthResponse)
def health_check():
    return HealthResponse(
        status="healthy" if predictor.is_ready else "degraded",
        model_loaded=predictor.is_ready,
        model_path=str(predictor.model_file or "None"),
        total_classes=len(predictor.id2label),
        device="CPU (ONNX Runtime)"
    )

@app.post("/api/detect", response_model=PredictionResponse)
async def detect_crop_disease(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Validate extension
    allowed_extensions = {".jpg", ".jpeg", ".png", ".webp"}
    filename = file.filename or "leaf.jpg"
    ext = os.path.splitext(filename)[1].lower()
    if ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported image format '{ext}'. Allowed formats are JPG, JPEG, PNG, and WEBP."
        )

    # Validate file size (max 10MB)
    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image file exceeds 10MB limit.")
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    # Validate it's a valid image using PIL
    try:
        from io import BytesIO
        pil_img = Image.open(BytesIO(contents))
        pil_img.verify()
        pil_img = Image.open(BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid or corrupted image file.")

    # Save image to uploads folder
    unique_filename = f"{uuid.uuid4().hex[:12]}_{filename}"
    file_path = os.path.join(UPLOADS_DIR, unique_filename)
    try:
        pil_img.save(file_path)
    except Exception:
        with open(file_path, "wb") as f:
            f.write(contents)

    # Run inference
    try:
        prediction_result = predictor.predict(pil_img)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

    # Store record in SQLite database
    image_url = f"/uploads/{unique_filename}"
    scan_record = ScanHistory(
        crop_name=prediction_result["crop"],
        predicted_disease=prediction_result["predicted_disease"],
        confidence=prediction_result["confidence"],
        severity=prediction_result["severity"],
        image_filename=unique_filename,
        image_url=image_url,
        symptoms=json.dumps(prediction_result["symptoms"]),
        treatment_organic=json.dumps(prediction_result["treatment_organic"]),
        treatment_chemical=json.dumps(prediction_result["treatment_chemical"]),
        prevention=json.dumps(prediction_result["prevention"])
    )
    db.add(scan_record)
    db.commit()
    db.refresh(scan_record)

    # Attach scan_id and image_url
    prediction_result["scan_id"] = scan_record.id
    prediction_result["image_url"] = image_url

    return PredictionResponse(**prediction_result)

@app.get("/api/history", response_model=List[ScanHistoryItem])
def get_scan_history(db: Session = Depends(get_db)):
    scans = db.query(ScanHistory).order_by(ScanHistory.created_at.desc()).limit(50).all()
    return scans

@app.delete("/api/history/{scan_id}")
def delete_scan(scan_id: int, db: Session = Depends(get_db)):
    record = db.query(ScanHistory).filter(ScanHistory.id == scan_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Scan record not found.")
    
    # Try deleting image file from uploads
    try:
        img_p = os.path.join(UPLOADS_DIR, record.image_filename)
        if os.path.exists(img_p):
            os.remove(img_p)
    except Exception:
        pass

    db.delete(record)
    db.commit()
    return {"message": "Scan deleted successfully", "id": scan_id}

@app.get("/api/stats", response_model=StatsResponse)
def get_dashboard_stats(db: Session = Depends(get_db)):
    scans = db.query(ScanHistory).all()
    total = len(scans)
    healthy = sum(1 for s in scans if "healthy" in s.predicted_disease.lower() or s.severity.lower() == "none (healthy)")
    diseased = total - healthy

    crop_counts = {}
    disease_counts = {}
    for s in scans:
        crop_counts[s.crop_name] = crop_counts.get(s.crop_name, 0) + 1
        disease_counts[s.predicted_disease] = disease_counts.get(s.predicted_disease, 0) + 1

    return StatsResponse(
        total_scans=total,
        healthy_scans=healthy,
        diseased_scans=diseased,
        common_crops=crop_counts,
        common_diseases=disease_counts
    )

@app.get("/api/diseases")
def list_supported_diseases():
    return {
        "total_diseases": len(DISEASE_KNOWLEDGE_BASE),
        "catalog": DISEASE_KNOWLEDGE_BASE
    }

@app.get("/api/sample-images")
def get_sample_images():
    samples = []
    if os.path.exists(SAMPLES_DIR):
        for f in os.listdir(SAMPLES_DIR):
            if f.lower().endswith((".jpg", ".jpeg", ".png")):
                label = f.replace(".jpg", "").replace(".jpeg", "").replace(".png", "").replace("_", " ").title()
                samples.append({
                    "filename": f,
                    "label": label,
                    "url": f"/samples/{f}"
                })
    return {"samples": samples}

from fastapi.responses import FileResponse, JSONResponse

FRONTEND_DIST = os.path.join(PROJECT_ROOT, "frontend", "dist")

@app.post("/api/chat", response_model=ChatResponse)
def chat_with_agribot(req: ChatRequest):
    result = farmer_bot.process_message(
        message=req.message,
        lang=req.language or "en",
        crop_context=req.crop_context,
        recent_scan_id=req.recent_scan_id
    )
    return ChatResponse(**result)

# Serve production frontend if built
if os.path.exists(FRONTEND_DIST):
    assets_dir = os.path.join(FRONTEND_DIST, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        # Allow API, docs, uploads, and samples to pass through
        if (full_path.startswith("api/") or 
            full_path.startswith("uploads/") or 
            full_path.startswith("samples/") or 
            full_path.startswith("docs") or 
            full_path.startswith("openapi.json")):
            raise HTTPException(status_code=404, detail="Endpoint not found")
        
        target = os.path.join(FRONTEND_DIST, full_path)
        if os.path.exists(target) and os.path.isfile(target):
            return FileResponse(target)
        
        index_file = os.path.join(FRONTEND_DIST, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        raise HTTPException(status_code=404, detail="Frontend index.html not found")

