import { useState, useMemo } from "react";
import {
  Boxes,
  Users,
  Car,
  Bike,
  Bus,
  Truck,
  Route,
  TriangleAlert,
  Gauge,
  Clock3,
} from "lucide-react";

import {
  AnalyticsAPI,
  VideosAPI,
} from "../api/api";

import useFetch from "../hooks/useFetch";

import Loading from "../components/Loading";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";

function Analytics() {
  const [selectedVideo, setSelectedVideo] = useState("");
  const [videoId, setVideoId] = useState("");

  // Load all uploaded videos
  const {
    data: videos,
    loading: videosLoading,
  } = useFetch(VideosAPI);

  // Fetch analytics only after clicking Load
  const fetchAnalytics = useMemo(() => {
    if (!videoId) return null;

    return () => AnalyticsAPI(videoId);
  }, [videoId]);

  const {
    data: analytics,
    loading,
    error,
  } = useFetch(fetchAnalytics);

  const chartData = useMemo(() => {
    if (!analytics?.object_distribution) return [];

    return Object.entries(analytics.object_distribution).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
  }, [analytics]);

  const objectCounts = analytics?.object_distribution || {};

  const hourData = [
    { hour: "00", count: 12 },
    { hour: "02", count: 18 },
    { hour: "04", count: 25 },
    { hour: "06", count: 14 },
    { hour: "08", count: 31 },
    { hour: "10", count: 44 },
    { hour: "12", count: 40 },
    { hour: "14", count: 28 },
    { hour: "16", count: 35 },
    { hour: "18", count: 46 },
    { hour: "20", count: 37 },
    { hour: "22", count: 22 },
  ];

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Analytics Dashboard
          </h1>

          <p className="text-gray-500">
            AI Surveillance Video Analytics
          </p>
        </div>

        <div className="flex gap-3">

          <select
            className="border rounded-lg px-4 py-2"
            value={selectedVideo}
            onChange={(e) => setSelectedVideo(e.target.value)}
          >
            <option value="">
              Select Video
            </option>

            {videos?.map((video) => (
              <option
                key={video.id}
                value={video.id}
              >
                {video.filename || `Video ${video.id}`}
              </option>
            ))}

          </select>

          <button
            onClick={() => setVideoId(selectedVideo)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Load Analytics
          </button>

        </div>

      </div>

      {videosLoading && (
        <Loading text="Loading videos..." />
      )}

      {loading && (
        <Loading text="Loading analytics..." />
      )}

      {error && (
        <div className="rounded-lg bg-red-100 text-red-700 p-4">
          Failed to load analytics.
        </div>
      )}

      {!analytics ? (

        <div className="rounded-xl bg-white shadow p-12 text-center text-gray-500">
          Select a video and click
          <b> Load Analytics</b>.
        </div>

      ) : (

        <>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">

            <StatCard
              title="Objects"
              value={analytics.total_objects ?? 0}
              icon={Boxes}
            />

            <StatCard
              title="Persons"
              value={objectCounts.person ?? 0}
              icon={Users}
            />

            <StatCard
              title="Cars"
              value={objectCounts.car ?? 0}
              icon={Car}
            />

            <StatCard
              title="Bikes"
              value={objectCounts.motorcycle ?? 0}
              icon={Bike}
            />

            <StatCard
              title="Buses"
              value={objectCounts.bus ?? 0}
              icon={Bus}
            />

          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">

            <StatCard
              title="Trucks"
              value={objectCounts.truck ?? 0}
              icon={Truck}
            />

            <StatCard
              title="Tracks"
              value={analytics.total_tracks ?? 0}
              icon={Route}
            />

            <StatCard
              title="Events"
              value={analytics.total_events ?? 0}
              icon={TriangleAlert}
            />

            <StatCard
              title="Confidence"
              value={`${(
                (analytics.average_confidence ?? 0) * 100
              ).toFixed(1)}%`}
              icon={Gauge}
            />

            <StatCard
              title="Time"
              value={`${analytics.processing_time ?? 0}s`}
              icon={Clock3}
            />

          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            <ChartCard
              title="Object Distribution"
              type="pie"
              data={chartData}
            />

            <ChartCard
              title="Detections Per Hour"
              type="line"
              data={hourData}
            />

          </div>

        </>

      )}

    </div>
  );
}

export default Analytics;