from sqlalchemy.orm import Session

from app.models.entity import Entity


class EntityRepository:
    def create_entity(
        self,
        db: Session,
        entity_type: str,
        confidence: float,
    ) -> Entity:

        entity = Entity(
            entity_type=entity_type,
            confidence=confidence,
        )

        db.add(entity)

        try:
            db.commit()
            db.refresh(entity)
            return entity

        except Exception as e:
            db.rollback()

            print("========== ENTITY COMMIT FAILED ==========")
            print(type(e))
            print(e)

            raise

    def get_all_entities(
        self,
        db: Session,
    ):
        return db.query(Entity).all()


entity_repository = EntityRepository()