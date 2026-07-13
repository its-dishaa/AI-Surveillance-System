from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.video import (
    VideoCreate,
    VideoUpdate,
    VideoResponse,
)
from app.services.video_service import video_service
router = APIRouter(
    prefix="/videos",
    tags=["Videos"],
)
@router.post(
    "/",
    response_model=VideoResponse,
)
def create_video(
    video: VideoCreate,
    db: Session = Depends(get_db),
):
    """
    Register a new video.
    """

    try:
        return video_service.create_video(
            db,
            video,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
@router.get(
    "/",
    response_model=list[VideoResponse],
)
def get_all_videos(
    db: Session = Depends(get_db),
):
    """
    Retrieve all videos.
    """

    return video_service.get_all_videos(db)
@router.get(
    "/{video_id}",
    response_model=VideoResponse,
)
def get_video(
    video_id: int,
    db: Session = Depends(get_db),
):
    """
    Retrieve a video by ID.
    """

    video = video_service.get_video(
        db,
        video_id,
    )

    if video is None:
        raise HTTPException(
            status_code=404,
            detail="Video not found.",
        )

    return video
@router.put(
    "/{video_id}",
    response_model=VideoResponse,
)
def update_video(
    video_id: int,
    video_data: VideoUpdate,
    db: Session = Depends(get_db),
):
    """
    Update an existing video.
    """

    try:
        return video_service.update_video(
            db,
            video_id,
            video_data,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
@router.delete("/{video_id}")
def delete_video(
    video_id: int,
    db: Session = Depends(get_db),
):
    """
    Delete a video.
    """

    try:
        video_service.delete_video(
            db,
            video_id,
        )

        return {
            "message": "Video deleted successfully."
        }

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )