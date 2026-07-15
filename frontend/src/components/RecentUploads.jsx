import { CheckCircle, Loader2 } from "lucide-react";

const uploads = [
  {
    id: 1,
    name: "traffic.mp4",
    camera: "Parking Lot",
    time: "4 minutes ago",
    status: "Completed",
  },
  {
    id: 2,
    name: "mall.mp4",
    camera: "Lobby",
    time: "10 minutes ago",
    status: "Processing",
  },
  {
    id: 3,
    name: "warehouse.mp4",
    camera: "Warehouse",
    time: "20 minutes ago",
    status: "Completed",
  },
];

function RecentUploads() {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-lg font-semibold mb-5">
        Recent Uploads
      </h2>

      <div className="space-y-4">

        {uploads.map((video) => (

          <div
            key={video.id}
            className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition"
          >

            <div>

              <h3 className="font-semibold">
                {video.name}
              </h3>

              <p className="text-sm text-gray-500">
                {video.camera} • {video.time}
              </p>

            </div>

            {video.status === "Completed" ? (

              <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                <CheckCircle size={16} />

                Completed

              </span>

            ) : (

              <span className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                <Loader2
                  size={16}
                  className="animate-spin"
                />

                Processing

              </span>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentUploads;