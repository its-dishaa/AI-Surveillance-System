from sqlalchemy import (
    Float,
    ForeignKey,
    Integer,
    UniqueConstraint
)

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class TrackPoint(Base):

    __tablename__ = "track_points"


    __table_args__ = (
        UniqueConstraint(
            "track_id",
            "frame_number",
            name="unique_track_frame"
        ),
    )


    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )


    track_id: Mapped[int] = mapped_column(
        ForeignKey("tracks.id"),
        nullable=False
    )


    frame_number: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )


    timestamp_seconds: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )


    x1: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )


    y1: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )


    x2: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )


    y2: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )


    track = relationship(
        "Track",
        back_populates="track_points"
    )