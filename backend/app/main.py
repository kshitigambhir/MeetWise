from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import TranscriptRequest, ExtractionResponse
from app.services.extractor import extract_raw, extract_final

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"status": "Decision Minutes Copilot running"}

@app.post("/extract/raw", response_model=ExtractionResponse)
def extract_raw_endpoint(request: TranscriptRequest):
    return extract_raw(request.transcript)

@app.post("/extract/final", response_model=ExtractionResponse)
def extract_final_endpoint(request: TranscriptRequest):
    return extract_final(request.transcript)
