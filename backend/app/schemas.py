from pydantic import BaseModel
from typing import List, Optional

class TranscriptRequest(BaseModel):
    transcript: str


class Decision(BaseModel):
    text: str
    confidence: float


class ActionItem(BaseModel):
    task: str
    owner: Optional[str]
    deadline: Optional[str]
    confidence: float


class Blocker(BaseModel):
    text: str
    confidence: float


class ExtractionResponse(BaseModel):
    decisions: List[Decision]
    action_items: List[ActionItem]
    blockers: List[Blocker]
