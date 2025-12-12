# Start Backend and Frontend

## Backend (Terminal 1)
```powershell
cd backend
& "D:/MY IDEA/fitnessApp/.venv/Scripts/python.exe" run.py
```

Backend will run on: http://localhost:5000

## Frontend (Terminal 2)
```powershell
cd frontend
ng serve
```

Frontend will run on: http://localhost:4200

## Quick Start
Open two terminals and run both commands above.

## API Endpoints
- Health Check: http://localhost:5000/health
- Auth Register: POST http://localhost:5000/api/auth/register
- Auth Login: POST http://localhost:5000/api/auth/login
- Chat: POST http://localhost:5000/api/chat/message
- Workouts: GET/POST http://localhost:5000/api/workouts
- Profile: GET/PUT http://localhost:5000/api/profile

## Troubleshooting
If you get connection errors:
1. Ensure backend is running on port 5000
2. Check CORS settings in backend/.env
3. Verify frontend environment.ts points to http://localhost:5000/api
