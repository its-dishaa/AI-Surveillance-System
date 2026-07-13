import { useParams } from "react-router-dom";

function CameraView() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Camera {id}
      </h1>

      <img
        src={`http://127.0.0.1:8000/stream/${id}`}
        alt="Camera Stream"
        className="w-full rounded-lg shadow"
      />
    </div>
  );
}

export default CameraView;