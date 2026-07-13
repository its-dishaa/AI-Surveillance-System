from sqlalchemy.orm import Session

from app.models.track_point import TrackPoint


class TrackPointRepository:


    def create_track_point(
        self,
        db: Session,
        track_id: int,
        frame_number: int,
        timestamp_seconds: float,
        x1: float,
        y1: float,
        x2: float,
        y2: float,
    ):


        existing = (
            db.query(TrackPoint)
            .filter(
                TrackPoint.track_id == track_id,
                TrackPoint.frame_number == frame_number
            )
            .first()
        )


        if existing:
            return existing



        point = TrackPoint(
            track_id=track_id,
            frame_number=frame_number,
            timestamp_seconds=timestamp_seconds,
            x1=x1,
            y1=y1,
            x2=x2,
            y2=y2,
        )


        db.add(point)
        db.commit()
        db.refresh(point)


        return point



    def get_points_by_track(
        self,
        db: Session,
        track_id:int
    ):

        return (
            db.query(TrackPoint)
            .filter(
                TrackPoint.track_id == track_id
            )
            .order_by(
                TrackPoint.frame_number
            )
            .all()
        )


track_point_repository = TrackPointRepository()