@echo off
title KrishiSeva - Unified Production Server
echo ===================================================
echo   KrishiSeva: Farmers Smart Crop Disease Detector
echo   Starting Unified Production Server on Port 8000
echo ===================================================
echo.

cd /d "%~dp0frontend"
echo [1/2] Verifying Frontend Production Build...
if not exist "dist\index.html" (
    echo Building frontend bundle...
    call npm run build
) else (
    echo Frontend build found.
)

echo.
cd /d "%~dp0backend"
echo [2/2] Launching Unified FastAPI Production Server...
echo App URL: http://localhost:8000
echo Network URL: http://0.0.0.0:8000
echo.
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
pause
