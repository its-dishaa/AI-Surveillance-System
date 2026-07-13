from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class Track(Base):
    __tablename__ = "tracks"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    tracker_id: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    entity_id: Mapped[int] = mapped_column(
        ForeignKey("entities.id"),
        nullable=False,
    )

    video_id: Mapped[int] = mapped_column(
        ForeignKey("videos.id"),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    entity = relationship(
        "Entity",
        back_populates="tracks",
    )

    video = relationship(
        "Video",
        back_populates="tracks",
    )

    track_points = relationship(
        "TrackPoint",
        back_populates="track",
        cascade="all, delete-orphan",
    )

    events = relationship(
        "Event",
        back_populates="track",
        cascade="all, delete-orphan",
    )