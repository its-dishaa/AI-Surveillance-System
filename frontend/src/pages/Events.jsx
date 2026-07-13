import { useState } from "react";

import { EventsAPI } from "../api/api";
import useFetch from "../hooks/useFetch";

import Loading from "../components/Loading";
import EventTable from "../components/EventTable";

function Events() {
  const {
    data: events,
    loading,
    error,
  } = useFetch(EventsAPI);

  const [selectedEvent, setSelectedEvent] = useState(null);

  if (loading) {
    return <Loading text="Loading events..." />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-100 p-6 text-red-700">
        Failed to load events.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold ">
          Events
        </h1>

        <p className="mt-2 text-gray-500">
          View all detected surveillance events.
        </p>
      </div>

      {/* Events Table */}
      <EventTable
  events={events || []}
  onView={setSelectedEvent}
/>

      {/* Event Details */}
      {selectedEvent && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-md p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold">
              Event Details
            </h2>

            <button
              onClick={() => setSelectedEvent(null)}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
            >
              Close
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <span className="font-semibold">
                Event ID:
              </span>{" "}
              {selectedEvent.id}
            </div>

            <div>
              <span className="font-semibold">
                Event Type:
              </span>{" "}
              {selectedEvent.event_type}
            </div>

            <div>
              <span className="font-semibold">
                Video ID:
              </span>{" "}
              {selectedEvent.video_id}
            </div>

            <div>
              <span className="font-semibold">
                Track ID:
              </span>{" "}
              {selectedEvent.track_id ?? "-"}
            </div>

            <div>
              <span className="font-semibold">
                Confidence:
              </span>{" "}
              {selectedEvent.confidence != null
                ? `${(selectedEvent.confidence * 100).toFixed(2)}%`
                : "-"}
            </div>

            <div>
              <span className="font-semibold">
                Timestamp:
              </span>{" "}
              {selectedEvent.timestamp ||
                selectedEvent.created_at ||
                "-"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;