from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class TopPrediction(BaseModel):
    label: str
    confidence: float

class PredictionResponse(BaseModel):
    scan_id: Optional[int] = None
    crop: str
    crop_te: str
    predicted_disease: str
    predicted_disease_te: str
    confidence: float
    is_healthy: bool
    severity: str
    description: str
    description_te: str
    symptoms: List[str]
    symptoms_te: List[str]
    treatment_organic: List[str]
    treatment_organic_te: List[str] = []
    treatment_chemical: List[str]
    treatment_chemical_te: List[str] = []
    prevention: List[str]
    prevention_te: List[str] = []
    helpline: str
    disclaimer: str
    disclaimer_te: str
    top_candidates: List[TopPrediction]
    image_url: str

class ScanHistoryItem(BaseModel):
    id: int
    crop_name: str
    predicted_disease: str
    confidence: float
    severity: str
    image_url: str
    created_at: datetime

    class Config:
        from_attributes = True

class StatsResponse(BaseModel):
    total_scans: int
    healthy_scans: int
    diseased_scans: int
    common_crops: dict
    common_diseases: dict

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_path: str
    total_classes: int
    device: str

class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "en"
    crop_context: Optional[str] = None
    recent_scan_id: Optional[int] = None

class ChatResponse(BaseModel):
    reply: str
    reply_te: Optional[str] = None
    diagnosis: Optional[dict] = None
    suggested_questions: List[str] = []
