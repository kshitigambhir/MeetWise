import re
from datetime import datetime

# --- Helper functions ---

DECISION_KEYWORDS = [
    "let’s finalize", "lets finalize", "finalize",
    "let’s lock", "lets lock", "lock",
    "we will", "we'll", "decide", "confirmed"
]

ACTION_PATTERNS = [
    r"(?P<owner>\w+):\s*i will\s+(?P<task>.+?)\s+by\s+(?P<date>.+)",
    r"(?P<owner>\w+):\s*i'll\s+(?P<task>.+?)\s+by\s+(?P<date>.+)",
]

BLOCKER_KEYWORDS = [
    "blocked", "pending", "waiting", "dependent",
    "dependency", "not received", "still pending"
]

MONTHS = [
    "january","february","march","april","may","june",
    "july","august","september","october","november","december"
]

def extract_date(text):
    for month in MONTHS:
        if month in text.lower():
            return text.strip()
    return None


# --- Main extractor ---

def extract_from_transcript(transcript: str):
    lines = transcript.split("\n")

    decisions = []
    action_items = []
    blockers = []

    for line in lines:
        clean_line = line.strip()
        lower = clean_line.lower()

        # -------- DECISIONS --------
        for kw in DECISION_KEYWORDS:
            if kw in lower:
                decisions.append({
                    "text": clean_line.split(":", 1)[-1].strip(),
                    "confidence": 0.9
                })
                break

        # -------- ACTION ITEMS --------
        for pattern in ACTION_PATTERNS:
            match = re.search(pattern, lower)
            if match:
                owner = match.group("owner").capitalize()
                task = match.group("task").strip()
                date = extract_date(match.group("date"))

                action_items.append({
                    "task": task,
                    "owner": owner,
                    "deadline": date,
                    "confidence": 0.85
                })
                break

        # -------- BLOCKERS --------
        for kw in BLOCKER_KEYWORDS:
            if kw in lower:
                blockers.append({
                    "text": clean_line.split(":", 1)[-1].strip(),
                    "confidence": 0.8
                })
                break

    return {
        "decisions": decisions,
        "action_items": action_items,
        "blockers": blockers
    }
