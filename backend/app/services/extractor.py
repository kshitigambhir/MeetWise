CONFIDENCE_THRESHOLD = 0.8

def _raw_extraction():
    return {
        "decisions": [
            {"text": "We will launch the beta next Friday", "confidence": 0.9},
            {"text": "Maybe redesign the UI", "confidence": 0.5}
        ],
        "action_items": [
            {
                "task": "Prepare beta release notes",
                "owner": "Riya",
                "deadline": "2025-02-07",
                "confidence": 0.85
            },
            {
                "task": "Think about marketing ideas",
                "owner": None,
                "deadline": None,
                "confidence": 0.6
            }
        ],
        "blockers": [
            {"text": "Legal approval is pending", "confidence": 0.8}
        ]
    }

def extract_raw(transcript: str):
    return _raw_extraction()

def extract_final(transcript: str):
    raw = _raw_extraction()
    return {
        "decisions": [d for d in raw["decisions"] if d["confidence"] >= CONFIDENCE_THRESHOLD],
        "action_items": [a for a in raw["action_items"] if a["confidence"] >= CONFIDENCE_THRESHOLD],
        "blockers": [b for b in raw["blockers"] if b["confidence"] >= CONFIDENCE_THRESHOLD]
    }
