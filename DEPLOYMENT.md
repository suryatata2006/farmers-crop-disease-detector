# 🚀 KrishiSeva - Deployment & Hosting Guide

This guide provides step-by-step instructions to deploy the **Farmers Smart Crop Disease Detector** prototype online for production, presentations, hackathons, and field use.

---

## 🌟 Architecture Overview

In production, the application runs as a **single, unified, high-performance web service**:
- **FastAPI Backend**: Serves deep learning inference (`/api/detect`), AI voice chatbot (`/api/chat`), scan history (`/api/history`), and health checks (`/api/health`).
- **React Frontend**: Served directly by FastAPI as a Single Page Application (SPA) from `/frontend/dist`.
- **Port**: Single unified port (default `8000` or `$PORT` provided by cloud host).
- **Inference**: High-speed ONNX Runtime CPU inference ($\sim 50\text{ms}$ latency, zero GPU required).

---

## ☁️ Option 1: Deploy on Render.com (Free & Recommended)

Render offers free hosting with automated HTTPS and GitHub CI/CD.

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "feat: complete unified deployment configuration"
git push origin master
```

### Step 2: Create a Free Web Service on Render
1. Go to [render.com](https://render.com) and sign in.
2. Click **"New +"** $\rightarrow$ **"Web Service"**.
3. Select **"Build and deploy from a Git repository"** and choose your repository.
4. Set the configuration:
   - **Name**: `krishiseva-crop-detector`
   - **Environment**: `Docker`
   - **Branch**: `master` or `main`
   - **Region**: Any close region (e.g., *Singapore* or *Oregon*)
   - **Instance Type**: **Free**
5. Click **"Create Web Service"**.

Render will automatically use the root `Dockerfile` to build the React frontend and launch the FastAPI server. In ~3 minutes, your live URL will be active at:
`https://krishiseva-crop-detector.onrender.com`

---

## 🚂 Option 2: Deploy on Railway.app

1. Install Railway CLI or visit [railway.app](https://railway.app).
2. From your project folder:
   ```bash
   npm i -g @railway/cli
   railway login
   railway init
   railway up
   ```
3. Or in Railway Dashboard, click **"New Project"** $\rightarrow$ **"Deploy from GitHub repo"**.
4. Railway detects `Dockerfile` or `Procfile` automatically and assigns an instant live HTTPS domain.

---

## 🤗 Option 3: Deploy Free on Hugging Face Spaces (Ideal for ML Apps)

Hugging Face provides **100% free CPU hosting with 16GB RAM** for AI/ML applications:

1. Go to [huggingface.co/spaces](https://huggingface.co/spaces) and click **"Create new Space"**.
2. Set:
   - **Space SDK**: `Docker`
   - **Space Hardware**: `Free CPU (16GB RAM, 2 vCPU)`
   - **License**: `mit` or `apache-2.0`
3. Push your repository to the Hugging Face Git remote:
   ```bash
   git remote add hf https://huggingface.co/spaces/YOUR_USERNAME/krishiseva
   git push hf master
   ```
4. The space will build and launch your prototype with a permanent public web link.

---

## 🐳 Option 4: Deploy with Docker / Docker Compose (Any Cloud VPS)

To deploy on any Linux/Windows server, AWS EC2, DigitalOcean Droplet, or Google Cloud VM:

```bash
# Clone the repository
git clone <your-repo-url>
cd farmers-crop-disease-detector

# Run in background with persistent volume
docker compose up -d
```

Your app is now live at `http://YOUR_SERVER_IP:8000` with automated health checks and restart policies!

---

## 📱 Option 5: Instant Public HTTPS URL for Live Mobile Testing

If you want to immediately demo the prototype to an evaluator or test it live on a farmer's smartphone without waiting for cloud builds:

Run the included sharing script:
```powershell
powershell -ExecutionPolicy Bypass -File .\share_online.ps1
```

This generates a temporary public HTTPS link (e.g., `https://green-farmer-80.loca.lt`) that anyone on the internet can open directly on their mobile phone!

---

## 💻 Option 6: Local Production Run on Windows

To run the unified production build on your local machine:

Double-click `start_production.bat` or run:
```bash
.\start_production.bat
```
Then visit **`http://localhost:8000`** in your browser.
