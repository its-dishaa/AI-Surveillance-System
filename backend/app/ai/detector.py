from ultralytics import YOLO


class Detector:
    """
    YOLOv8 Object Detector
    """

    def __init__(self):
        print("Loading YOLO model...")

        # Load YOLOv8 Nano model
        self.model = YOLO("yolov8n.pt")

        print("YOLO model loaded successfully!")

    def detect(self, frame):
        """
        Detect objects in a single frame.
        """

        print("=" * 50)
        print("Running YOLO Detection...")
        print("Detector object:", self)
        print("Model object:", self.model)
        print("Model type:", type(self.model))

        results = self.model(frame)

        print("Detection completed.")
        print("=" * 50)

        return results


# Global detector instance
detector = Detector()