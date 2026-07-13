from sqlalchemy.orm import Session

from app.repositories.entity_repository import entity_repository


class EntityService:

    def create_entity(
        self,
        db: Session,
        entity_type: str,
        confidence: float,
    ):
        return entity_repository.create_entity(
            db,
            entity_type,
            confidence,
        )


entity_service = EntityService()