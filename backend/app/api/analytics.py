from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.database import SessionLocal

from app.services.analytics_service import (
    analytics_service
)


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)



def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.get("/videos/{video_id}")
def get_video_analytics(
    video_id:int,
    db:Session = Depends(get_db)
):

    return analytics_service.get_video_summary(
        db,
        video_id
    )