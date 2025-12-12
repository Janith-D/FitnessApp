# Start Backend Server
Write-Host "Starting Fitness AI Coach Backend..." -ForegroundColor Green
Set-Location backend
& "$PSScriptRoot\..\..\.venv\Scripts\python.exe" run.py
