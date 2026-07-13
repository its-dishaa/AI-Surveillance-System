import { useMemo } from "react";
import {
  Camera,
  Video,
  Activity,
  Boxes,
} from "lucide-react";

import { DashboardAPI } from "../api/api";
import useFetch from "../hooks/useFetch";

import Loading from "../components/Loading";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";

function Dashboard() {
  const {
    data: overview,
    loading,
    error,
  } = useFetch(DashboardAPI);

  const chartData = useMemo(() => {
    if (!overview) return [];

    const distribution = overview.object_distribution;

    if (!distribution) return [];

    if (Array.isArray(distribution)) {
      return distribution;
    }

    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
    }));
  }, [overview]);

  if (loading) {
    return <Loading text="Loading dashboard..." />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-100 p-6 text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500 dark:text-gray-400">
          AI Surveillance System Overview
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Cameras"
          value={overview?.total_cameras ?? 0}
          icon={Camera}
          color="bg-blue-600"
        />

        <StatCard
          title="Total Videos"
          value={overview?.total_videos ?? 0}
          icon={Video}
          color="bg-green-600"
        />

        <StatCard
          title="Total Events"
          value={overview?.total_events ?? 0}
          icon={Activity}
          color="bg-red-600"
        />

        <StatCard
          title="Tracked Objects"
          value={
            overview?.total_objects ??
            overview?.total_tracked_objects ??
            0
          }
          icon={Boxes}
          color="bg-purple-600"
        />
      </div>

      {/* Object Distribution */}
      <ChartCard
        title="Object Distribution"
        data={chartData}
        type="bar"
      />
    </div>
  );
}

export default Dashboard; 
