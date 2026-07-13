from pydantic import BaseModel, ConfigDict

from typing import Optional

class CameraCreate(BaseModel):
    name: str
    latitude: float
    longitude: float
    source: Optional[str] = None


class CameraUpdate(BaseModel):
    name: str
    latitude: float
    longitude: float
    source: Optional[str] = None


class CameraResponse(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    source: str | None = None

    model_config = ConfigDict(from_attributes=True)