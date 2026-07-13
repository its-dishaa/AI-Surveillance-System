from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.schemas.event import EventResponse
from app.services.event_service import event_service


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# Global Event Routes
# -----------------------------
router = APIRouter(
    prefix="/events",
    tags=["Events"],
)


@router.get(
    "/",
    response_model=list[EventResponse],
)
def get_all_events(
    db: Session = Depends(get_db),
):
    return event_service.get_all_events(db)


@router.get(
    "/type/{event_type}",
    response_model=list[EventResponse],
)
def get_events_by_type(
    event_type: str,
    db: Session = Depends(get_db),
):
    return event_service.get_events_by_type(
        db,
        event_type,
    )


# -----------------------------
# Video Event Routes
# -----------------------------
video_router = APIRouter(
    prefix="/videos",
    tags=["Events"],
)


@video_router.get(
    "/{video_id}/events",
    response_model=list[EventResponse],
)
def get_video_events(
    video_id: int,
    skip: int = 0,
    limit: int = 50,
    start_time: float | None = None,
    end_time: float | None = None,
    event_type: str | None = None,
    db: Session = Depends(get_db),
):
    return event_service.get_events_by_video(
        db=db,
        video_id=video_id,
        skip=skip,
        limit=limit,
        start_time=start_time,
        end_time=end_time,
        event_type=event_type,
    )