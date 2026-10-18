import os
import json
import urllib.request
import numpy as np
from PIL import Image
import onnxruntime as ort
from app.disease_data import get_disease_details

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "model")
os.makedirs(MODEL_DIR, exist_ok=True)

MODEL_PATH = os.path.join(MODEL_DIR, "model.onnx")
FALLBACK_MODEL_PATH = os.path.join(MODEL_DIR, "model_quantized.onnx")
CONFIG_PATH = os.path.join(MODEL_DIR, "config.json")

MODEL_URL = "https://huggingface.co/onnx-community/mobilenet_v2_1.0_224-plant-disease-identification-ONNX/resolve/main/onnx/model.onnx"
CONFIG_URL = "https://huggingface.co/onnx-community/mobilenet_v2_1.0_224-plant-disease-identification-ONNX/raw/main/config.json"

class PlantDiseasePredictor:
    def __init__(self):
        self.session = None
        self.id2label = {}
        self.model_file = None
        self._ensure_model()
        self._load_model()

    def _ensure_model(self):
        # Ensure config exists
        if not os.path.exists(CONFIG_PATH):
            try:
                print("Downloading config.json...")
                urllib.request.urlretrieve(CONFIG_URL, CONFIG_PATH)
            except Exception as e:
                print(f"Warning: Could not download config.json: {e}")

        # Ensure model exists
        if not os.path.exists(MODEL_PATH) and not os.path.exists(FALLBACK_MODEL_PATH):
            try:
                print("Downloading model.onnx...")
                urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
            except Exception as e:
                print(f"Warning: Could not download model.onnx: {e}")

    def _load_model(self):
        # Load label mapping
        if os.path.exists(CONFIG_PATH):
            with open(CONFIG_PATH, "r") as f:
                config_data = json.load(f)
                self.id2label = config_data.get("id2label", {})

        # Load ONNX session
        target_path = MODEL_PATH if os.path.exists(MODEL_PATH) else FALLBACK_MODEL_PATH
        if os.path.exists(target_path):
            self.model_file = target_path
            self.session = ort.InferenceSession(target_path)
            print(f"Loaded ONNX model from {target_path}")
        else:
            print("Warning: No ONNX model file found on disk.")

    @property
    def is_ready(self) -> bool:
        return self.session is not None and len(self.id2label) > 0

    def preprocess_image(self, pil_image: Image.Image) -> np.ndarray:
        """
        Preprocess image to match MobileNetV2 requirements:
        1. Convert to RGB
        2. Resize shortest edge to 256
        3. Center crop to 224x224
        4. Normalize (pixel / 255.0 - 0.5) / 0.5
        5. Convert to NCHW format
        """
        img = pil_image.convert("RGB")
        w, h = img.size
        if w < h:
            new_w = 256
            new_h = int(h * (256 / w))
        else:
            new_h = 256
            new_w = int(w * (256 / h))
        img = img.resize((new_w, new_h), Image.Resampling.BILINEAR)

        left = (new_w - 224) // 2
        top = (new_h - 224) // 2
        img = img.crop((left, top, left + 224, top + 224))

        arr = (np.array(img).astype(np.float32) / 255.0 - 0.5) / 0.5
        arr = np.transpose(arr, (2, 0, 1))
        arr = np.expand_dims(arr, axis=0)
        return arr

    def predict(self, pil_image: Image.Image) -> dict:
        if not self.is_ready:
            raise RuntimeError("Model is not initialized or labels missing.")

        input_arr = self.preprocess_image(pil_image)
        input_name = self.session.get_inputs()[0].name
        output_name = self.session.get_outputs()[0].name

        outputs = self.session.run([output_name], {input_name: input_arr})
        logits = outputs[0][0]

        # Softmax
        exp_logits = np.exp(logits - np.max(logits))
        probs = exp_logits / np.sum(exp_logits)

        # Top index
        top_idx = int(np.argmax(probs))
        top_label = self.id2label.get(str(top_idx), "Unknown Plant Condition")
        confidence = float(probs[top_idx])

        # Top 3 candidates
        top_indices = np.argsort(probs)[::-1][:3]
        top_candidates = [
            {"label": self.id2label.get(str(i), "Unknown"), "confidence": round(float(probs[i]) * 100, 2)}
            for i in top_indices
        ]

        # Lookup disease details
        details = get_disease_details(top_label)

        disclaimer = "AI predictions are preliminary advisory indicators. For commercial or high-value decisions, consult your local Krishi Vigyan Kendra (KVK) or agriculture extension officer."
        disclaimer_te = "ఈ కృత్రిమ మేధస్సు (AI) సూచనలు ప్రాథమిక పరిశీలన కోసం మాత్రమే. రసాయన మందుల వాడకానికి ముందు స్థానిక వ్యవసాయ అధికారి లేదా కృషి విజ్ఞాన కేంద్రాన్ని (KVK) సంప్రదించండి."

        return {
            "crop": details["crop"],
            "crop_te": details["crop_te"],
            "predicted_disease": details["disease_name"],
            "predicted_disease_te": details["disease_name_te"],
            "confidence": round(confidence * 100, 1),
            "is_healthy": details["is_healthy"],
            "severity": details["severity"],
            "description": details["description"],
            "description_te": details["description_te"],
            "symptoms": details["symptoms"],
            "symptoms_te": details["symptoms_te"],
            "treatment_organic": details["treatment_organic"],
            "treatment_organic_te": details.get("treatment_organic_te", []),
            "treatment_chemical": details["treatment_chemical"],
            "treatment_chemical_te": details.get("treatment_chemical_te", []),
            "prevention": details["prevention"],
            "prevention_te": details.get("prevention_te", []),
            "helpline": details.get("helpline", "Kisan Call Center: 1800-180-1551"),
            "disclaimer": disclaimer,
            "disclaimer_te": disclaimer_te,
            "top_candidates": top_candidates
        }

# Global predictor singleton
predictor = PlantDiseasePredictor()
