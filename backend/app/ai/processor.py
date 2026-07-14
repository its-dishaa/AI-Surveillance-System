import traceback
from pathlib import Path

import cv2
import supervision as sv

from app.ai.detector import detector
from app.ai.tracker import tracker
from app.database.database import SessionLocal
from app.services.entity_service import entity_service
from app.services.track_service import track_service
from app.services.track_point_service import track_point_service
from app.services.event_service import event_service


def process_video(video_path: str, video_id: int = 1) -> str:
    db = SessionLocal()
    cap = None
    writer = None

    try:
        print("=" * 60)
        print("STEP 1: Opening video")
        print("=" * 60)

        BASE_DIR = Path(__file__).resolve().parent.parent.parent
        video_path = BASE_DIR / "uploads" / Path(video_path).name
        print("Opening video:", video_path)

        output_dir = BASE_DIR / "processed"
        output_dir.mkdir(parents=True, exist_ok=True)

        output_path = output_dir / f"processed_{video_path.name}"

        cap = cv2.VideoCapture(str(video_path))
        if not cap.isOpened():
            raise Exception(f"Unable to open video: {video_path}")

        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        if fps <= 0:
            fps = 30

        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        writer = cv2.VideoWriter(
            str(output_path),
            cv2.VideoWriter_fourcc(*"mp4v"),
            fps,
            (width, height),
        )

        frame_number = 0

        while True:
            success, frame = cap.read()
            if not success:
                print("Reached end of video.")
                break

            frame_number += 1
            if frame_number % 100 == 0:
                print(f"Processing frame {frame_number}/{total_frames}")

            results = detector.detect(frame)
            detections = sv.Detections.from_ultralytics(results[0])
            tracks = tracker.update(detections)
            annotated_frame = results[0].plot()

            if tracks.tracker_id is not None:
                for i in range(len(tracks.xyxy)):
                    tracker_id = int(tracks.tracker_id[i])
                    class_name = str(tracks.data["class_name"][i])
                    confidence = float(tracks.confidence[i]) if tracks.confidence is not None else 0.0
                    x1, y1, x2, y2 = tracks.xyxy[i]
                    timestamp = frame_number / fps

                    track = track_service.get_track(db, tracker_id, video_id)
                    if track is None:
                        entity = entity_service.create_entity(db, class_name, confidence)
                        track = track_service.create_track(db, tracker_id, entity.id, video_id)

                    track_point_service.create_track_point(
                        db=db,
                        track_id=track.id,
                        frame_number=frame_number,
                        timestamp_seconds=timestamp,
                        x1=float(x1),
                        y1=float(y1),
                        x2=float(x2),
                        y2=float(y2),
                    )

                    event_service.create_event(
                        db,
                        video_id,
                        track.id,
                        class_name,
                        confidence,
                        timestamp,
                    )

                    cv2.putText(
                        annotated_frame,
                        f"{class_name} #{tracker_id}",
                        (int(x1), int(y1) - 10),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.6,
                        (0,255,0),
                        2,
                    )

            writer.write(annotated_frame)

        print("Video Processing Completed")
        print(f"Processed video saved at: {output_path}")

        return str(output_path)

    except Exception:
        print("PROCESSING FAILED")
        traceback.print_exc()
        raise
    finally:
        if cap is not None:
            cap.release()
        if writer is not None:
            writer.release()
        db.close()
