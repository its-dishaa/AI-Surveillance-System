from sqlalchemy.orm import Session

from app.repositories.analytics_repository import (
    analytics_repository
)


class AnalyticsService:


    def get_video_summary(
        self,
        db: Session,
        video_id:int
    ):

        return analytics_repository.get_video_summary(
            db,
            video_id
        )


analytics_service = AnalyticsService()