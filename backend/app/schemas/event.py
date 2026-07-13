from datetime import datetime

from pydantic import BaseModel, ConfigDict


class EventResponse(BaseModel):
    id: int
    video_id: int
    track_id: int
    event_type: str
    confidence: float
    timestamp: float
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)