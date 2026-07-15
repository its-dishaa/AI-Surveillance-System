import {
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

const events = [
  {
    id: 1,
    type: "Intrusion",
    camera: "Camera 1",
    score: 0.96,
  },
  {
    id: 2,
    type: "Loitering",
    camera: "Camera 2",
    score: 0.83,
  },
  {
    id: 3,
    type: "Crowd",
    camera: "Camera 3",
    score: 0.91,
  },
];

function RecentEvents() {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-lg font-semibold mb-5">
        Recent Events
      </h2>

      <div className="space-y-4">

        {events.map((event) => (

          <div
            key={event.id}
            className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition"
          >

            <div className="flex items-center gap-3">

              <div className="bg-red-100 p-3 rounded-lg">

                <AlertTriangle
                  className="text-red-600"
                  size={18}
                />

              </div>

              <div>

                <h3 className="font-semibold">
                  {event.type}
                </h3>

                <p className="text-sm text-gray-500">
                  {event.camera}
                </p>

              </div>

            </div>

            <span className="font-semibold text-gray-600">
              {event.score}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentEvents;