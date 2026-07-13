from pathlib import Path
import shutil

from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.video import VideoCreate
from app.services.video_service import video_service

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)

UPLOAD_FOLDER = Path("uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)


@router.post("/")
async def upload_video(
    camera_id: int = Form(...),
    video: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Upload a CCTV video and register it in the database.
    """

    # Save file to uploads folder
    file_path = UPLOAD_FOLDER / video.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)

    # Create database record
    video_data = VideoCreate(
        filename=video.filename,
        camera_id=camera_id,
    )

    try:
        db_video = video_service.create_video(
            db,
            video_data,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    return {
        "message": "Video uploaded successfully.",
        "video_id": db_video.id,
        "camera_id": db_video.camera_id,
        "filename": db_video.filename,
        "path": str(file_path),
    }