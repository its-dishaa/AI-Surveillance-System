from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.services.track_service import track_service

router = APIRouter(
    prefix="/videos",
    tags=["Tracks"],
)


@router.get("/{video_id}/tracks")
def get_tracks(
    video_id: int,
    db: Session = Depends(get_db),
):
    print("Requested video_id:", video_id)

    tracks = track_service.get_tracks_by_video(
        db,
        video_id,
    )

    print("Tracks found:", len(tracks))

    return tracks