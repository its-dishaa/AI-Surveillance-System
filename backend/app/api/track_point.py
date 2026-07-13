from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.database import SessionLocal

from app.services.track_point_service import (
    track_point_service
)



router = APIRouter(
    prefix="/tracks",
    tags=["Track Points"]
)



def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.get("/{track_id}/points")
def get_track_points(
    track_id:int,
    db:Session = Depends(get_db)
):

    points = track_point_service.get_points_by_track(
        db,
        track_id
    )

    return points