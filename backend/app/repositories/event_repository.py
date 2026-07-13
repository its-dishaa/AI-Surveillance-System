from sqlalchemy.orm import Session

from app.models.event import Event


class EventRepository:


    def create_event(
        self,
        db: Session,
        video_id: int,
        track_id: int,
        event_type: str,
        confidence: float,
        timestamp: float,
    ) -> Event:


        event = Event(
            video_id=video_id,
            track_id=track_id,
            event_type=event_type,
            confidence=confidence,
            timestamp=timestamp,
        )


        db.add(event)
        db.commit()
        db.refresh(event)


        return event





    def get_all_events(
        self,
        db: Session,
        skip: int = 0,
        limit: int = 100,
    ):


        return (
            db.query(Event)
            .order_by(Event.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )





    def get_events_by_video(
        self,
        db: Session,
        video_id: int,
        skip: int = 0,
        limit: int = 50,
        start_time: float | None = None,
        end_time: float | None = None,
        event_type: str | None = None,
    ):


        query = (
            db.query(Event)
            .filter(Event.video_id == video_id)
        )


        if start_time is not None:
            query = query.filter(
                Event.timestamp >= start_time
            )


        if end_time is not None:
            query = query.filter(
                Event.timestamp <= end_time
            )


        if event_type is not None:
            query = query.filter(
                Event.event_type == event_type
            )


        return (
            query
            .order_by(Event.timestamp)
            .offset(skip)
            .limit(limit)
            .all()
        )



event_repository = EventRepository()