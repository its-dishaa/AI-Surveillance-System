from sqlalchemy.orm import Session

from app.repositories.track_repository import track_repository


class TrackService:


    def create_track(
        self,
        db: Session,
        tracker_id: int,
        entity_id: int,
        video_id: int,
    ):

        return track_repository.create_track(
            db,
            tracker_id,
            entity_id,
            video_id,
        )


    def get_track(
        self,
        db: Session,
        tracker_id: int,
        video_id: int,
    ):

        return track_repository.get_track_by_tracker_id(
            db,
            tracker_id,
            video_id,
        )


    def get_tracks_by_video(
        self,
        db: Session,
        video_id: int,
    ):

        return track_repository.get_tracks_by_video(
            db,
            video_id,
        )


track_service = TrackService()