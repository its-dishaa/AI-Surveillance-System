from fastapi import APIRouter

from app.api.analytics import router as analytics_router
from app.api.upload import router as upload_router
from app.api.camera import router as camera_router
from app.api.video import router as video_router
from app.api.process import router as process_router
from app.api.dashboard import router as dashboard_router
from app.api.track import router as track_router
from app.api.track_point import router as track_point_router
from app.api.event import (
    router as event_router,
    video_router as video_event_router,
)
from app.api.stream import router as stream_router
from app.api.live_camera import router as live_camera_router


api_router = APIRouter()

api_router.include_router(analytics_router)
api_router.include_router(upload_router)
api_router.include_router(camera_router)
api_router.include_router(video_router)
api_router.include_router(process_router)
api_router.include_router(dashboard_router)
api_router.include_router(track_router)
api_router.include_router(track_point_router)
api_router.include_router(event_router)
api_router.include_router(video_event_router)
api_router.include_router(stream_router)
api_router.include_router(live_camera_router)