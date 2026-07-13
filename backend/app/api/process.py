from pathlib import Path

from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.video import Video
from app.ai.processor import process_video

router = APIRouter(
    prefix="/process",
    tags=["Processing"],
)


@router.post("/{video_id}")
def process_uploaded_video(video_id: int):

    db: Session = SessionLocal()

    try:
        video = (
            db.query(Video)
            .filter(Video.id == video_id)
            .first()
        )

        if video is None:
            raise HTTPException(
                status_code=404,
                detail="Video not found."
            )

        # Build the path to the uploaded video
        video_path = Path("uploads") / video.filename

        # Process the video
        processed_path = process_video(
            str(video_path),
            video.id,
        )

        return {
            "message": "Video processed successfully.",
            "processed_video": processed_path,
        }

    finally:
        db.close()