from datetime import datetime

from pydantic import BaseModel, ConfigDict


class VideoBase(BaseModel):
    filename: str
    camera_id: int


class VideoCreate(VideoBase):
    pass


class VideoUpdate(VideoBase):
    pass


class VideoResponse(VideoBase):
    id: int
    upload_time: datetime

    model_config = ConfigDict(
        from_attributes=True
    )