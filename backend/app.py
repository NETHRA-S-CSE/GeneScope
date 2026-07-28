from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag import ask_genescope

app = FastAPI(title="GeneScope API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Restrict this later for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "GeneScope API is running 🚀"}

@app.post("/chat")
def chat(request: ChatRequest):
    return ask_genescope(request.message)