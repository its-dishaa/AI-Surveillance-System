import { Eye } from "lucide-react";
import Table from "./Table";
import formatDate from "../utils/formatDate";

function EventTable({
  events = [],
  onView,
}) {
  const columns = [
    {
      key: "id",
      header: "Event ID",
    },
    {
      key: "event_type",
      header: "Event Type",
      render: (event) => (
        <span className="font-medium capitalize">
          {event.event_type || "-"}
        </span>
      ),
    },
    {
      key: "video_id",
      header: "Video ID",
    },
    {
      key: "track_id",
      header: "Track ID",
    },
    {
      key: "confidence",
      header: "Confidence",
      render: (event) =>
        event.confidence !== undefined &&
        event.confidence !== null
          ? `${(event.confidence * 100).toFixed(2)}%`
          : "-",
    },
    {
      key: "timestamp",
      header: "Timestamp",
      render: (event) =>
        formatDate(
          event.timestamp ||
            event.created_at ||
            event.event_time
        ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={events}
      emptyMessage="No events found."
      actions={
        onView
          ? (event) => (
              <button
                onClick={() => onView(event)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <Eye size={16} />
                View
              </button>
            )
          : undefined
      }
    />
  );
}

export default EventTable;