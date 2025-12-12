@echo off
echo Starting Fitness AI Coach Backend...
cd /d "%~dp0"
call ..\.venv\Scripts\activate.bat
python run.py
pause
