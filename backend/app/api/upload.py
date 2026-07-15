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

BASE_DIR = Path(__file__).resolve().parent.parent.parent
UPLOAD_FOLDER = BASE_DIR / "uploads"
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)


@router.post("/")
async def upload_video(
    camera_id: int = Form(...),
    video: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:
        print("===== Upload Started =====")
        print("Camera:", camera_id)
        print("Filename:", video.filename)

        file_path = UPLOAD_FOLDER / video.filename

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

        video_data = VideoCreate(
            filename=video.filename,
            camera_id=camera_id,
            file_path=str(file_path),
        )

        db_video = video_service.create_video(db, video_data)

        print("Database saved:", db_video.id)

        return {
            "message": "Video uploaded successfully",
            "video_id": db_video.id,
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))