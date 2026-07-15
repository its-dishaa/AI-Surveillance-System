import {
  Camera,
  Video,
  Activity,
  AlertTriangle,
} from "lucide-react";
import ObjectChart from "../components/ObjectChart";
import DetectionChart from "../components/DetectionChart";
import RecentUploads from "../components/RecentUploads";
import RecentEvents from "../components/RecentEvents";
import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Cameras"
          value="5"
          icon={Camera}
          color="bg-blue-600"
        />

        <StatCard
          title="Videos"
          value="24"
          icon={Video}
          color="bg-green-600"
        />

        <StatCard
          title="Objects"
          value="987"
          icon={Activity}
          color="bg-orange-500"
        />

        <StatCard
          title="Events"
          value="45"
          icon={AlertTriangle}
          color="bg-red-500"
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        <ObjectChart />

        <DetectionChart />
        <RecentUploads />

  <RecentEvents />

      </div>

    </div>
  );
}

export default Dashboard;