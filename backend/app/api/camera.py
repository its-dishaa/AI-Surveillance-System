from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.camera import (
    CameraCreate,
    CameraUpdate,
    CameraResponse,
)
from app.services.camera_service import camera_service


# Create router FIRST
router = APIRouter(
    prefix="/cameras",
    tags=["Cameras"],
)


@router.get("/debug")
def debug_cameras(
    db: Session = Depends(get_db),
):
    cameras = camera_service.get_all_cameras(db)

    return [
        {
            "id": camera.id,
            "name": camera.name,
            "latitude": camera.latitude,
            "longitude": camera.longitude,
        }
        for camera in cameras
    ]


@router.post(
    "/",
    response_model=CameraResponse,
)
def create_camera(
    camera: CameraCreate,
    db: Session = Depends(get_db),
):
    """
    Register a new CCTV camera.
    """
    try:
        return camera_service.create_camera(db, camera)

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/",
    response_model=list[CameraResponse],
)
def get_all_cameras(
    db: Session = Depends(get_db),
):
    return camera_service.get_all_cameras(db)

@router.delete("/{camera_id}")
def delete_camera(
    camera_id: int,
    db: Session = Depends(get_db),
):
    try:
        camera_service.delete_camera(
            db,
            camera_id,
        )
        return {"message": "Camera deleted successfully."}

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
@router.get(
    "/{camera_id}",
    response_model=CameraResponse,
)
def get_camera(
    camera_id: int,
    db: Session = Depends(get_db),
):
    camera = camera_service.get_camera(
        db,
        camera_id,
    )

    if camera is None:
        raise HTTPException(
            status_code=404,
            detail="Camera not found.",
        )

    return camera