from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal

from app.services.dashboard_service import (
    dashboard_service
)



router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)



def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.get("/overview")
def dashboard_overview(
    db:Session = Depends(get_db)
):

    return dashboard_service.get_overview(
        db
    )