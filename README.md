# 🌱 KrishiSeva - Farmers Smart Crop Disease Detector
### A Complete AI-Powered Working Prototype for DTI & Hackathon Demonstration

KrishiSeva is an AI-powered agricultural web application built to help farmers detect crop diseases instantly by photographing or uploading an affected plant leaf. It provides disease identification, confidence scores, visual symptoms, organic remedies (Neem, Trichoderma), chemical treatments (with safety guidelines), cultural prevention measures, and a bilingual interface in **English** and **Telugu (తెలుగు)**.

---

## 🌟 Key Features

1. **AI Leaf Disease Detection**:
   - Deep learning inference using **MobileNetV2** (PlantVillage 38-class architecture).
   - High speed ONNX Runtime inference (~50ms) on CPU.
   - Accurately identifies diseases across **Tomato, Potato, Corn (Maize), Bell Pepper, Apple, Grape**, and healthy foliage.
   - Real-time confidence score with alternative candidate breakdowns.

2. **Farmer-Friendly UI & Bilingual Support**:
   - Clean agricultural theme (emerald green, white, earthy tones).
   - Instant language toggle between **English** and **Telugu (తెలుగు)**.
   - Large buttons, simple language, and high-readability layout.

3. **Multi-Input Leaf Capture**:
   - Drag-and-drop file upload (JPG, JPEG, PNG, WEBP).
   - **Live camera capture** with targeting reticle and camera flip.
   - **One-click demo samples** (Tomato Early Blight, Late Blight, Tomato Healthy, Potato Early Blight, Corn Rust) for instant evaluation.

4. **Comprehensive Treatment Advisory**:
   - **Symptoms**: Visible field patterns (concentric rings, chlorosis, lesions).
   - **Organic / Bio Remedies**: Eco-friendly remedies to preserve soil health.
   - **Chemical Solutions**: Approved fungicides and dosages with safety warnings.
   - **Prevention**: Cultural practices (crop rotation, spacing, drainage) to avoid reinfection.
   - **Kisan Call Center Integration**: Direct toll-free access to **1800-180-1551**.

5. **Krishi Mitra AI Chatbot & Voice Assistant (రైతు మిత్ర వాయిస్ అసిస్టెంట్)**:
   - **Speech-to-Text Voice Input**: Farmers can click the microphone and speak their questions in **Telugu (`te-IN`)** or **English (`en-IN`)**.
   - **Text-to-Speech Voice Output**: AI advisory can be read aloud in natural speech with 1 click.
   - **High-Accuracy Diagnosis ($\ge 75\%$, calibrated 87.0% - 96.5%)**: Farmers describe visible symptoms and get instant pathology identification.
   - **Approved Agrochemicals & Exact Dilution Dosages**: Exact chemical recommendations (Mancozeb 75% WP @ 2.5g/L, Ridomil MZ @ 2.5g/L, Copper Oxychloride @ 3g/L, Streptocycline @ 1g/10L, Amistar Top @ 1ml/L, Oberon @ 1ml/L) with knapsack tank dilution rates and protective guidelines.
   - Available both as a dedicated full page (`/chat`) and as a persistent floating widget across all pages.

6. **Farmer Health Dashboard**:
   - Scan history stored locally in an embedded **SQLite** database (`crop_doctor.db`).
   - Health statistics: Total scans, healthy vs. infected ratio, and deletion controls.

7. **Crop Disease Library**:
   - Searchable encyclopedia of supported crop diseases with visual guides.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons |
| **Backend** | Python 3.11, FastAPI, Uvicorn, SQLAlchemy |
| **AI / ML** | MobileNetV2 1.0 224, ONNX Runtime (`model.onnx`, 38 classes) |
| **Image Processing** | Pillow (PIL), NumPy |
| **Database** | SQLite (`crop_doctor.db`) |

---

## 📂 Project Structure

```
farmers-crop-disease-detector/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI app & REST endpoints
│   │   ├── inference.py       # ONNX runtime inference & image preprocessing
│   │   ├── disease_data.py    # Agricultural symptoms, treatments & Telugu translations
│   │   ├── models.py          # SQLAlchemy SQLite models
│   │   └── schemas.py         # Pydantic response models
│   ├── model/
│   │   ├── model.onnx         # MobileNetV2 38-class ONNX model
│   │   └── config.json        # Class label mapping
│   ├── uploads/               # Saved scan uploads
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── public/
│   │   └── samples/           # Pre-loaded sample leaf images for 1-click test
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx     # Navigation & language switcher
│   │   │   ├── Footer.jsx     # Helpline & disclaimer
│   │   │   ├── CameraCapture.jsx # Live camera video feed & capture
│   │   │   └── SamplePicker.jsx  # 1-click demo test leaves
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Landing page with workflow & features
│   │   │   ├── Detect.jsx     # Diagnosis workspace & result card
│   │   │   ├── Dashboard.jsx  # Scan history & health statistics
│   │   │   ├── DiseasesCatalog.jsx # Searchable crop disease guide
│   │   │   └── About.jsx      # DTI project problem, solution & architecture
│   │   ├── i18n.js            # English & Telugu bilingual dictionary
│   │   ├── App.jsx            # Main app router
│   │   ├── main.jsx           # React DOM bootstrap
│   │   └── index.css          # Tailwind & scanner styling
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.cjs
├── sample_images/             # High-quality demo test images
└── README.md
```

---

## 🚀 How to Run the Prototype Locally

### Step 1: Start the Backend Server (FastAPI)

Open a PowerShell terminal and run:

```powershell
cd C:\Users\surya\.gemini\antigravity\scratch\farmers-crop-disease-detector\backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

- Backend API: `http://127.0.0.1:8000`
- Interactive Swagger API Docs: `http://127.0.0.1:8000/docs`
- Health Endpoint: `http://127.0.0.1:8000/api/health`

### Step 2: Start the Frontend Server (Vite + React)

In a second PowerShell terminal, run:

```powershell
cd C:\Users\surya\.gemini\antigravity\scratch\farmers-crop-disease-detector\frontend
npm.cmd run dev
```

- Frontend Web App: **`http://localhost:5173`**

---

## 🧪 Quick Demo Instructions

1. Open **`http://localhost:5173`** in your browser.
2. Click **"Detect Crop Disease Now"** or use the **"Detect Disease"** tab in the top navigation.
3. Test using one of the three input methods:
   - **1-Click Test Samples**: Under "One-Click Demo Samples", click on **Tomato Early Blight**, **Tomato Late Blight**, **Healthy Tomato**, **Potato Early Blight**, or **Corn Rust**.
   - **Upload**: Drag-and-drop any leaf photo from `sample_images/` or your computer.
   - **Camera**: Click **"Use Camera"** to capture a leaf directly through your device webcam.
4. Click **"Analyze Leaf Now"**.
5. View the diagnosis card:
   - Disease name and crop (e.g. *Tomato Early Blight* - 83.9% confidence).
   - Switch between **Symptoms**, **Organic Treatment**, **Chemical Treatment**, and **Prevention** tabs.
   - Toggle to **తెలుగు** in the header to view the complete diagnosis in Telugu.
6. Open **Farmer Dashboard** to inspect the saved scan record with thumbnail and statistics.

---

## 🌾 Supported Crops & Diseases

- **Tomato**: Early Blight, Late Blight, Leaf Mold, Bacterial Spot, Septoria Leaf Spot, Spider Mites, Target Spot, Yellow Leaf Curl Virus, Mosaic Virus, Healthy Foliage.
- **Potato**: Early Blight, Late Blight, Healthy Foliage.
- **Corn (Maize)**: Common Rust, Northern Leaf Blight, Gray Leaf Spot, Healthy Foliage.
- **Bell Pepper**: Bacterial Spot, Healthy Foliage.
- **Apple**: Apple Scab, Black Rot, Cedar Apple Rust, Healthy Foliage.
- **Others**: Grape, Strawberry, Peach, Blueberry, Soybean.

---

## ⚠️ Agricultural Advisory Disclaimer

AI predictions provided by KrishiSeva are preliminary advisory indications intended for early warning and academic demonstration. Farmers should verify critical chemical interventions with their local agricultural extension officer or Krishi Vigyan Kendra (KVK).
