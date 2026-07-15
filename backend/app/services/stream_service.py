from pathlib import Path
import cv2

from app.ai.detector import detector
from app.models.video import Video


def generate_frames(video: Video):

    print("=" * 50)
    print("Opening:", video.file_path)

    cap = cv2.VideoCapture(video.file_path)

    print("Video opened:", cap.isOpened())

    if not cap.isOpened():
        print(f"Cannot open video: {video.file_path}")
        return

    while True:
        success, frame = cap.read()

        if not success:
            break

        results = detector.detect(frame)

        annotated_frame = results[0].plot()

        success, buffer = cv2.imencode(".jpg", annotated_frame)

        if not success:
            continue

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + buffer.tobytes()
            + b"\r\n"
        )

    cap.release()