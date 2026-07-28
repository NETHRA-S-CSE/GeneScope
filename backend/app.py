import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag import ask_genescope

app = FastAPI(
    title="GeneScope API",
    description="RAG Backend API for GeneScope - Women's Health AI Assistant",
    version="1.0.0"
)

# Enable CORS for local dev and Vercel deployments
allowed_origins = [
    "*",
    "http://localhost:5173",
    "http://localhost:3000",
    "https://*.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {
        "status": "online",
        "service": "GeneScope RAG API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "genescope-backend"}

@app.get("/topics")
def get_topics():
    return {
        "topics": [
            {
                "id": "pcos",
                "title": "PCOS & Hormonal Balance",
                "icon": "Activity",
                "description": "Symptoms, lifestyle, and dietary guidance for Polycystic Ovary Syndrome."
            },
            {
                "id": "endometriosis",
                "title": "Endometriosis & Chronic Pain",
                "icon": "HeartPulse",
                "description": "Understanding pelvic pain, symptoms, and non-invasive relief options."
            },
            {
                "id": "cycle",
                "title": "Menstrual Cycle & Ovulation",
                "icon": "Calendar",
                "description": "Cycle phases, fertile window indicators, and hormonal fluctuations."
            },
            {
                "id": "nutrition",
                "title": "Stress, Nutrition & Sleep",
                "icon": "Sparkles",
                "description": "Holistic wellness, cortisol balance, and sleep hygiene for reproductive health."
            }
        ]
    }

@app.post("/chat")
def chat(request: ChatRequest):
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    try:
        response = ask_genescope(request.message.strip())
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred processing your request: {str(e)}")