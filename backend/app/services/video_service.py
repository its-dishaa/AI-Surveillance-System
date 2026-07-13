from sqlalchemy.orm import Session

from app.models.video import Video
from app.repositories.video_repository import video_repository
from app.repositories.camera_repository import camera_repository
from app.schemas.video import VideoCreate, VideoUpdate


class VideoService:
    """
    Service layer for Video business logic.
    """

    def create_video(
        self,
        db: Session,
        video_data: VideoCreate,
    ) -> Video:
        """
        Create a new video.
        """

        camera = camera_repository.get_camera_by_id(
            db,
            video_data.camera_id,
        )

        if camera is None:
            raise ValueError("Camera not found.")

        return video_repository.create_video(
            db,
            video_data,
        )

    def get_video(
        self,
        db: Session,
        video_id: int,
    ) -> Video | None:
        """
        Retrieve a video by ID.
        """

        return video_repository.get_video_by_id(
            db,
            video_id,
        )

    def get_all_videos(
        self,
        db: Session,
    ) -> list[Video]:
        """
        Retrieve all videos.
        """

        return video_repository.get_all_videos(db)

    def update_video(
        self,
        db: Session,
        video_id: int,
        video_data: VideoUpdate,
    ) -> Video:
        """
        Update an existing video.
        """

        video = video_repository.get_video_by_id(
            db,
            video_id,
        )

        if video is None:
            raise ValueError("Video not found.")

        camera = camera_repository.get_camera_by_id(
            db,
            video_data.camera_id,
        )

        if camera is None:
            raise ValueError("Camera not found.")

        return video_repository.update_video(
            db,
            video,
            video_data,
        )

    def delete_video(
        self,
        db: Session,
        video_id: int,
    ) -> None:
        """
        Delete a video.
        """

        video = video_repository.get_video_by_id(
            db,
            video_id,
        )

        if video is None:
            raise ValueError("Video not found.")

        video_repository.delete_video(
            db,
            video,
        )


video_service = VideoService()