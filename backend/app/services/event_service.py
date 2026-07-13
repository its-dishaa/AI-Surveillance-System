from sqlalchemy.orm import Session

from app.repositories.event_repository import event_repository


class EventService:


    def create_event(
        self,
        db: Session,
        video_id: int,
        track_id: int,
        event_type: str,
        confidence: float,
        timestamp: float,
    ):

        return event_repository.create_event(
            db,
            video_id,
            track_id,
            event_type,
            confidence,
            timestamp,
        )



    def get_all_events(
        self,
        db: Session,
        skip: int = 0,
        limit: int = 100,
    ):

        return event_repository.get_all_events(
            db=db,
            skip=skip,
            limit=limit,
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

        return event_repository.get_events_by_video(
            db=db,
            video_id=video_id,
            skip=skip,
            limit=limit,
            start_time=start_time,
            end_time=end_time,
            event_type=event_type,
        )



event_service = EventService()