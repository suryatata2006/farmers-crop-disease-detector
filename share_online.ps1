# KrishiSeva - Instant Public HTTPS Tunnel
# Exposes http://localhost:8000 to the world for live mobile and hackathon testing

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  KrishiSeva: Instant Public URL Generator" -ForegroundColor Yellow
Write-Host "  Sharing http://localhost:8000 securely to the Internet" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Checking if local server is active on port 8000..." -ForegroundColor Cyan
try {
    $res = Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/health" -TimeoutSec 3 -UseBasicParsing
    Write-Host "Local unified server is RUNNING (Status: $($res.StatusCode))!" -ForegroundColor Green
} catch {
    Write-Host "Local server not detected on port 8000. Starting unified server first..." -ForegroundColor Yellow
    Start-Process -FilePath "python" -ArgumentList "-m uvicorn app.main:app --host 0.0.0.0 --port 8000" -WorkingDirectory "$PSScriptRoot\backend"
    Start-Sleep -Seconds 3
}

Write-Host ""
Write-Host "Generating public HTTPS URL using localtunnel (free, no sign-up)..." -ForegroundColor Cyan
Write-Host "Open the generated link on your smartphone or share with evaluators!" -ForegroundColor Yellow
Write-Host ""

npx --yes localtunnel --port 8000
