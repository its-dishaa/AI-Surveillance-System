from typing import Optional

from sqlalchemy.orm import Session

from app.models.video import Video
from app.schemas.video import VideoCreate, VideoUpdate


class VideoRepository:
    """
    Repository class for Video database operations.
    """

    def create_video(
        self,
        db: Session,
        video: VideoCreate,
    ) -> Video:
        """
        Create a new video in the database.
        """

        db_video = Video(
            filename=video.filename,
            camera_id=video.camera_id,
        )

        db.add(db_video)
        db.commit()
        db.refresh(db_video)

        return db_video

    def get_video_by_id(
        self,
        db: Session,
        video_id: int,
    ) -> Optional[Video]:
        """
        Retrieve a video by its ID.
        """

        return (
            db.query(Video)
            .filter(Video.id == video_id)
            .first()
        )

    def get_all_videos(
        self,
        db: Session,
    ) -> list[Video]:
        """
        Retrieve all videos.
        """

        return db.query(Video).all()

    def update_video(
        self,
        db: Session,
        video: Video,
        video_data: VideoUpdate,
    ) -> Video:
        """
        Update an existing video.
        """

        video.filename = video_data.filename
        video.camera_id = video_data.camera_id

        db.commit()
        db.refresh(video)

        return video

    def delete_video(
        self,
        db: Session,
        video: Video,
    ) -> None:
        """
        Delete a video.
        """

        db.delete(video)
        db.commit()


video_repository = VideoRepository()