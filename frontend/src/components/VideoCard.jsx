import { Trash2, PlayCircle, Film } from "lucide-react";
import formatDate from "../utils/formatDate";

function VideoCard({ video, onDelete, onView }) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${video.filename || video.name}"?`
    );

    if (confirmed) {
      onDelete(video.id);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 p-5">
      <div className="flex items-start justify-between">
        {/* Video Information */}
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-indigo-100">
            <Film size={28} className="text-indigo-600" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 break-all">
              {video.filename || video.name || "Untitled Video"}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              ID: {video.id}
            </p>

            {video.camera_id && (
              <p className="text-sm text-gray-500">
                Camera ID: {video.camera_id}
              </p>
            )}

            {(video.created_at || video.uploaded_at) && (
              <p className="text-sm text-gray-500">
                Uploaded:{" "}
                {formatDate(video.created_at || video.uploaded_at)}
              </p>
            )}

            {video.status && (
              <span
                className={`inline-flex mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  video.status.toLowerCase() === "processed"
                    ? "bg-green-100 text-green-700"
                    : video.status.toLowerCase() === "processing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {video.status}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onView && (
            <button
              onClick={() => onView(video)}
              className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
              title="View Details"
            >
              <PlayCircle size={18} />
            </button>
          )}

          <button
            onClick={handleDelete}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition"
            title="Delete Video"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;