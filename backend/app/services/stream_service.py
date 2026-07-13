from pathlib import Path
import cv2

from app.ai.detector import detector
from app.models.video import Video

UPLOAD_FOLDER = Path("uploads")


def generate_frames(video: Video):

    video_path = UPLOAD_FOLDER / video.filename

    print("=" * 50)
    print(f"Opening video: {video_path}")

    cap = cv2.VideoCapture(str(video_path))

    print("Video opened:", cap.isOpened())

    while True:

        success, frame = cap.read()
        print("Frame read:", success)

        if not success:
            break

        print("Running detection...")

        results = detector.detect(frame)

        print("Detection complete")

        annotated_frame = results[0].plot()

        success, buffer = cv2.imencode(".jpg", annotated_frame)

        if not success:
            continue

        print("Sending frame")

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + buffer.tobytes()
            + b"\r\n"
        )

    cap.release()