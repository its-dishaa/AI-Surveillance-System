import { MapPinned } from "lucide-react";
import Table from "./Table";

function TrackTable({
  tracks = [],
  onViewPoints,
}) {
  const columns = [
    {
      key: "id",
      header: "Track ID",
    },
    {
      key: "video_id",
      header: "Video ID",
    },
    {
      key: "object_class",
      header: "Object",
      render: (track) => (
        <span className="capitalize">
          {track.object_class ||
            track.class_name ||
            track.label ||
            "-"}
        </span>
      ),
    },
    {
      key: "confidence",
      header: "Confidence",
      render: (track) =>
        track.confidence !== undefined &&
        track.confidence !== null
          ? `${(track.confidence * 100).toFixed(2)}%`
          : "-",
    },
    {
      key: "points",
      header: "Track Points",
      render: (track) =>
        track.total_points ??
        track.points_count ??
        track.points ??
        "-",
    },
  ];

  return (
    <Table
      columns={columns}
      data={tracks}
      emptyMessage="No tracks found."
      actions={
        onViewPoints
          ? (track) => (
              <button
                onClick={() => onViewPoints(track)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <MapPinned size={16} />
                View Points
              </button>
            )
          : undefined
      }
    />
  );
}

export default TrackTable;