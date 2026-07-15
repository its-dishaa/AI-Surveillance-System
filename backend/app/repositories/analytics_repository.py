from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.entity import Entity
from app.models.track import Track
from app.models.event import Event
from app.models.track_point import TrackPoint


class AnalyticsRepository:

    def get_video_summary(
        self,
        db: Session,
        video_id: int
    ):

        # Total unique tracked objects
        total_objects = (
            db.query(
                func.count(Track.id)
            )
            .filter(
                Track.video_id == video_id
            )
            .scalar()
        )

        # Object category count
        object_types = (
            db.query(
                Entity.entity_type,
                func.count(Entity.id)
            )
            .join(
                Track,
                Track.entity_id == Entity.id
            )
            .filter(
                Track.video_id == video_id
            )
            .group_by(
                Entity.entity_type
            )
            .all()
        )

        # Total events
        total_events = (
            db.query(
                func.count(Event.id)
            )
            .filter(
                Event.video_id == video_id
            )
            .scalar()
        )

        # Average confidence
        avg_confidence = (
            db.query(
                func.avg(Entity.confidence)
            )
            .join(
                Track,
                Track.entity_id == Entity.id
            )
            .filter(
                Track.video_id == video_id
            )
            .scalar()
        )

        # Total movement points
        total_track_points = (
            db.query(
                func.count(TrackPoint.id)
            )
            .join(
                Track,
                TrackPoint.track_id == Track.id
            )
            .filter(
                Track.video_id == video_id
            )
            .scalar()
        )

        # Most detected object
        most_detected = (
            db.query(
                Entity.entity_type,
                func.count(Entity.id)
            )
            .join(
                Track,
                Track.entity_id == Entity.id
            )
            .filter(
                Track.video_id == video_id
            )
            .group_by(
                Entity.entity_type
            )
            .order_by(
                func.count(Entity.id).desc()
            )
            .first()
        )

        # Object distribution dictionary
        distribution = {
            obj[0].lower(): obj[1]
            for obj in object_types
        }

        return {

            "video_id": video_id,

            "total_objects": total_objects,

            "total_events": total_events,

            # Number of tracks
            "total_tracks": total_objects,

            # Placeholder (replace later with actual processing time)
            "processing_time": 0,

            "total_track_points": total_track_points,

            "average_confidence": (
                round(avg_confidence, 3)
                if avg_confidence
                else 0
            ),

            "most_detected_object": (
                most_detected[0]
                if most_detected
                else None
            ),

            "person_count": distribution.get("person", 0),

            "car_count": distribution.get("car", 0),

            "motorcycle_count": distribution.get("motorcycle", 0),

            "bus_count": distribution.get("bus", 0),

            "truck_count": distribution.get("truck", 0),

            "object_distribution": distribution
        }


analytics_repository = AnalyticsRepository()