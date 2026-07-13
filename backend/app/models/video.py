from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Integer,
    String
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.database.database import Base


class Video(Base):

    __tablename__ = "videos"


    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )


    camera_id: Mapped[int] = mapped_column(
        ForeignKey("cameras.id"),
        nullable=False
    )


    filename: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )


    file_path: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )


    upload_time: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )


    camera = relationship(
        "Camera",
        back_populates="videos"
    )


    tracks = relationship(
        "Track",
        back_populates="video",
        cascade="all, delete-orphan"
    )


    events = relationship(
        "Event",
        back_populates="video",
        cascade="all, delete-orphan"
    )