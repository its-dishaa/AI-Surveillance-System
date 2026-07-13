from sqlalchemy.orm import Session

from app.models.track import Track
from app.models.entity import Entity


class TrackRepository:


    def create_track(
        self,
        db: Session,
        tracker_id: int,
        entity_id: int,
        video_id: int,
    ):

        track = Track(
            tracker_id=tracker_id,
            entity_id=entity_id,
            video_id=video_id,
        )

        db.add(track)
        db.commit()
        db.refresh(track)

        return track



    def get_track_by_tracker_id(
        self,
        db: Session,
        tracker_id: int,
        video_id: int,
    ):

        return (
            db.query(Track)
            .filter(
                Track.tracker_id == tracker_id,
                Track.video_id == video_id,
            )
            .first()
        )



    def get_tracks_by_video(
        self,
        db: Session,
        video_id:int,
    ):

        return (
            db.query(Track)
            .join(
                Entity,
                Track.entity_id == Entity.id
            )
            .filter(
                Track.video_id == video_id
            )
            .all()
        )


track_repository = TrackRepository()