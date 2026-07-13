import cv2

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.services.camera_service import camera_service


router = APIRouter(
    prefix="/live",
    tags=["Live Camera"],
)


def generate(camera_source):

    cap = cv2.VideoCapture(camera_source)

    while True:

        success, frame = cap.read()

        if not success:
            break

        _, buffer = cv2.imencode(".jpg", frame)

        frame = buffer.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + frame
            + b"\r\n"
        )

    cap.release()


@router.get("/{camera_id}")
def live_camera(
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
            detail="Camera not found",
        )

    return StreamingResponse(
        generate(camera.source),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )