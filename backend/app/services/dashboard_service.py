from sqlalchemy.orm import Session

from app.repositories.dashboard_repository import (
    dashboard_repository
)



class DashboardService:


    def get_overview(
        self,
        db:Session
    ):

        return dashboard_repository.get_overview(
            db
        )



dashboard_service = DashboardService()