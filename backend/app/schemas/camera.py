from pydantic import BaseModel, ConfigDict


class CameraCreate(BaseModel):
    name: str
    latitude: float
    longitude: float
    source: str


class CameraUpdate(BaseModel):
    name: str
    latitude: float
    longitude: float
    source: str


class CameraResponse(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    source: str

    model_config = ConfigDict(from_attributes=True)