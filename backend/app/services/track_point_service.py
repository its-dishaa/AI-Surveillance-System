from sqlalchemy.orm import Session

from app.repositories.track_point_repository import (
    track_point_repository
)


class TrackPointService:


    def create_track_point(
        self,
        db,
        track_id,
        frame_number,
        timestamp_seconds,
        x1,
        y1,
        x2,
        y2
    ):

        return track_point_repository.create_track_point(
            db,
            track_id,
            frame_number,
            timestamp_seconds,
            x1,
            y1,
            x2,
            y2
        )



    def get_points_by_track(
        self,
        db:Session,
        track_id:int
    ):

        return track_point_repository.get_points_by_track(
            db,
            track_id
        )


track_point_service = TrackPointService()