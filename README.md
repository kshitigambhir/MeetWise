# MeetWise

MeetWise is an end-to-end AI-powered web application that converts meeting transcripts into clear decisions, actionable tasks, and blockers.  
It uses a structured backend pipeline with confidence-based filtering and presents results in a clean, human-readable UI.

---

## Live Demo

- Frontend (Vercel):(https://meetwise-56ibyg238-kshitis-projects-ff595e14.vercel.app)
- Backend (Render): https://meetwise-qlpi.onrender.com  
- API Docs: https://meetwise-qlpi.onrender.com/docs  

Note: The backend is deployed on a free-tier service and may take some time to respond on the first request due to cold starts.

---

## Features

- Paste raw meeting transcripts (multi-speaker supported)
- Automatically extracts:
  - Decisions
  - Action items (owner and deadline)
  - Blockers
- Confidence-based filtering to reduce uncertain outputs
- Human-in-the-loop friendly design
- Clean, pastel-themed, human-readable UI
- Fully deployed frontend and backend

---

## Tech Stack

### Frontend
- React (Vite)
- Custom CSS (pastel theme)
- Deployed on Vercel

### Backend
- FastAPI (Python)
- Pydantic schemas for strict API contracts
- Confidence-filtered extraction pipeline
- Deployed on Render

---

## Architecture Overview

User Transcript  
→ Frontend (React)  
→ Backend API (FastAPI)  
→ Structured JSON (decisions, action items, blockers)  
→ Confidence filtering  
→ Human-readable UI  

The backend always returns structured JSON for reliability, while the frontend transforms it into a user-friendly decision dashboard.

---

## Sample Input

Rohit: Let’s finalize May 5 as the release date for the new dashboard.
Anita: I will complete the UI implementation by May 2.
Rohit: User testing is still pending due to limited feedback.

---

## Sample Output
<img width="1916" height="900" alt="image" src="https://github.com/user-attachments/assets/f794f103-7cc2-4c80-8b71-01fa999f140d" />


---

## Free Deployment Note

This project uses free-tier cloud services:
- Render for backend
- Vercel for frontend

As a result, the backend may sleep when idle and the first request can take noticeable time.  
This is a known and acceptable trade-off for portfolio deployments.

---

## Future Improvements

- Replace mock extraction with a real LLM API
- Add audio upload and speech-to-text
- Editable action items
- Export to tools like Jira or Notion
- Authentication and team support

---

## What This Project Demonstrates

- Full-stack system design
- Clean API contracts
- Confidence-aware AI outputs
- Human-centered UI design
- Real-world deployment workflow
- Iterative product development

---

## Author

Built by Kshiti Gambhir 

