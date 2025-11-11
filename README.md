# PawfectHome (MERN) - Full Project (Frontend + Backend)

This archive contains a basic MERN stack pet adoption app named **PawfectHome**.
It includes:
- Backend (Express + Node + Mongoose) with JWT auth for users, admin routes, and adoption handling.
- Frontend (React + Vite) with user signup/login, profile & adoption history, pet listings, pet details, adoption form, and admin dashboard (simple password header).

## Quick start

### Backend
```bash
cd PawfectHome/backend
npm install
# copy .env.example to .env and set MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend
```bash
cd PawfectHome/frontend
npm install
npm run dev
```

Backend default port: 5000. Frontend Vite default port: 5173.

Admin endpoints require header `x-admin-password` (default in .env.example: admin123).

Enjoy!

