from sqlalchemy.orm import Session

from app.models.camera import Camera
from app.repositories.camera_repository import camera_repository
from app.schemas.camera import CameraCreate, CameraUpdate

print(">>> CAMERA SERVICE LOADED <<<")


class CameraService:
    """
    Service layer for Camera business logic.
    """

    def create_camera(
        self,
        db: Session,
        camera_data: CameraCreate,
    ) -> Camera:

        print("===== CREATE CAMERA CALLED =====")
        print("Camera name:", camera_data.name)

        existing_camera = camera_repository.get_camera_by_name(
            db,
            camera_data.name,
        )

        print("Existing camera:", existing_camera)

        if existing_camera:
            raise ValueError("Camera with this name already exists.")

        return camera_repository.create_camera(
            db,
            camera_data,
        )

    def get_camera(
        self,
        db: Session,
        camera_id: int,
    ) -> Camera | None:

        return camera_repository.get_camera_by_id(
            db,
            camera_id,
        )

    def get_all_cameras(
        self,
        db: Session,
    ) -> list[Camera]:

        return camera_repository.get_all_cameras(db)

    def update_camera(
        self,
        db: Session,
        camera_id: int,
        camera_data: CameraUpdate,
    ) -> Camera:

        camera = camera_repository.get_camera_by_id(
            db,
            camera_id,
        )

        if camera is None:
            raise ValueError("Camera not found.")

        return camera_repository.update_camera(
            db,
            camera,
            camera_data,
        )

    def delete_camera(
        self,
        db: Session,
        camera_id: int,
    ) -> None:

        camera = camera_repository.get_camera_by_id(
            db,
            camera_id,
        )

        if camera is None:
            raise ValueError("Camera not found.")

        camera_repository.delete_camera(
            db,
            camera,
        )


camera_service = CameraService()