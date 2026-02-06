from fastapi import FastAPI
from app.schemas import TranscriptRequest, ExtractionResponse
from app.services.extractor import extract_from_transcript
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"status": "MeetWise backend running"}

@app.post("/extract/final", response_model=ExtractionResponse)
def extract_minutes(request: TranscriptRequest):
    return extract_from_transcript(request.transcript)
