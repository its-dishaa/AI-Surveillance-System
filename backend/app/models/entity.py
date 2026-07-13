import uuid
from datetime import datetime

from sqlalchemy import DateTime, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base

class Entity(Base):
    __tablename__ = "entities"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    entity_uuid: Mapped[str] = mapped_column(
        String(36),
        unique=True,
        default=lambda: str(uuid.uuid4()),
    )

    # Object class detected by YOLO
    entity_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    # Detection confidence
    confidence: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
    )

    # Timestamp when this entity was first detected
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    # Relationship with tracks
    tracks = relationship(
        "Track",
        back_populates="entity",
        cascade="all, delete-orphan",
    )