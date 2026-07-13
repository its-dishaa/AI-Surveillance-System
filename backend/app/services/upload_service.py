import os
import shutil

from fastapi import UploadFile
from sqlalchemy.orm import Session


class UploadService:
    """
    Service for handling video uploads.
    """

    async def upload_video(
        self,
        db: Session,
        camera_id: int,
        video: UploadFile,
    ):
        upload_dir = "uploads"

        os.makedirs(upload_dir, exist_ok=True)

        file_path = os.path.join(
            upload_dir,
            video.filename,
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                video.file,
                buffer,
            )

        return {
            "message": "Video uploaded successfully.",
            "camera_id": camera_id,
            "filename": video.filename,
            "path": file_path,
        }


upload_service = UploadService()