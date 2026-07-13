from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session


from app.database.database import SessionLocal
from app.models.video import Video
from app.services.stream_service import generate_frames


router = APIRouter(
    prefix="/stream",
    tags=["Stream"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.get("/{video_id}")
def video_stream(
    video_id: int,
    db: Session = Depends(get_db)
):

    video = (
        db.query(Video)
        .filter(Video.id == video_id)
        .first()
    )


    if not video:
        raise HTTPException(
            status_code=404,
            detail="Video not found"
        )


    return StreamingResponse(
        generate_frames(video),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )