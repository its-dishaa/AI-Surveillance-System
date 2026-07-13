from typing import Optional

from sqlalchemy.orm import Session

from app.models.camera import Camera
from app.schemas.camera import CameraCreate, CameraUpdate


class CameraRepository:
    """
    Repository for all Camera database operations.
    """

    def create_camera(
        self,
        db: Session,
        camera: CameraCreate,
    ) -> Camera:
        """
        Create a new camera.
        """

        db_camera = Camera(
            name=camera.name,
            latitude=camera.latitude,
            longitude=camera.longitude,
            source=camera.source,
        )

        db.add(db_camera)
        db.commit()
        db.refresh(db_camera)

        return db_camera

    def get_camera_by_id(
        self,
        db: Session,
        camera_id: int,
    ) -> Optional[Camera]:
        """
        Get camera by ID.
        """

        return (
            db.query(Camera)
            .filter(Camera.id == camera_id)
            .first()
        )

    def get_camera_by_name(
        self,
        db: Session,
        name: str,
    ) -> Optional[Camera]:
        """
        Get camera by name.
        """

        return (
            db.query(Camera)
            .filter(Camera.name == name)
            .first()
        )

    def get_all_cameras(
        self,
        db: Session,
    ) -> list[Camera]:
        """
        Get all cameras.
        """

        return db.query(Camera).all()

    def update_camera(
        self,
        db: Session,
        camera: Camera,
        camera_data: CameraUpdate,
    ) -> Camera:
        """
        Update camera.
        """

        camera.name = camera_data.name
        camera.latitude = camera_data.latitude
        camera.longitude = camera_data.longitude
        camera.source = camera_data.source

        db.commit()
        db.refresh(camera)

        return camera

    def delete_camera(
        self,
        db: Session,
        camera: Camera,
    ) -> None:
        """
        Delete camera.
        """

        db.delete(camera)
        db.commit()


camera_repository = CameraRepository()