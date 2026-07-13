from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from app.models.camera import Camera
from app.models.video import Video
from app.models.track import Track
from app.models.entity import Entity
from app.models.event import Event



class DashboardRepository:


    def get_overview(
        self,
        db: Session
    ):


        # Total cameras

        total_cameras = (
            db.query(
                func.count(Camera.id)
            )
            .scalar()
        )


        # Total videos

        total_videos = (
            db.query(
                func.count(Video.id)
            )
            .scalar()
        )


        # Total tracked objects

        total_tracks = (
            db.query(
                func.count(Track.id)
            )
            .scalar()
        )


        # Total detections

        total_events = (
            db.query(
                func.count(Event.id)
            )
            .scalar()
        )


        # Object distribution

        objects = (
            db.query(
                Entity.entity_type,
                func.count(Entity.id)
            )
            .group_by(
                Entity.entity_type
            )
            .all()
        )


        # Latest events

        latest_events = (
            db.query(Event)
            .order_by(
                desc(Event.created_at)
            )
            .limit(10)
            .all()
        )


        return {

            "total_cameras": total_cameras,

            "total_videos": total_videos,

            "total_tracks": total_tracks,

            "total_events": total_events,


            "object_distribution":
            {
                obj[0]: obj[1]
                for obj in objects
            },


            "latest_events":
            [
                {
                    "id":event.id,
                    "video_id":event.video_id,
                    "object_type":event.event_type,
                    "confidence":event.confidence,
                    "timestamp":event.timestamp
                }

                for event in latest_events
            ]

        }



dashboard_repository = DashboardRepository()