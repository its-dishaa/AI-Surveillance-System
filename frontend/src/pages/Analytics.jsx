import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Boxes,
  Activity,
  Percent,
  Trophy,
} from "lucide-react";

import { AnalyticsAPI } from "../api/api";

import useFetch from "../hooks/useFetch";

import Loading from "../components/Loading";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";


function Analytics() {

  const [searchParams] = useSearchParams();

  const videoId = searchParams.get("video");


 const fetchAnalytics = useMemo(() => {

  if (!videoId) {
    return null;
  }

  return () => AnalyticsAPI(videoId);

}, [videoId]);


const {
  data: analytics,
  loading,
  error,
} = useFetch(fetchAnalytics);



  const chartData = useMemo(() => {

    if (!analytics?.object_distribution) {
      return [];
    }


    if (Array.isArray(analytics.object_distribution)) {

      return analytics.object_distribution;

    }


    return Object.entries(
      analytics.object_distribution
    ).map(([name, value]) => ({
      name,
      value,
    }));


  }, [analytics]);



  if (!videoId) {

    return (

      <div className="rounded-xl border border-yellow-300 bg-yellow-100 p-6">

        <h2 className="text-xl font-semibold text-yellow-800">

          No Video Selected

        </h2>


        <p className="mt-2 text-yellow-700">

          Open a video from Videos page to view analytics.

        </p>


      </div>

    );

  }



  if (loading) {

    return <Loading text="Loading analytics..." />;

  }



  if (error) {

    return (

      <div className="rounded-xl border border-red-200 bg-red-100 p-6 text-red-700">

        Failed to load analytics.

      </div>

    );

  }



  return (

    <div className="space-y-8">


      <div>

        <h1 className="text-3xl font-bold text-gray-800">

          Video Analytics

        </h1>


        <p className="mt-2 text-gray-500">

          Analytics for Video #{videoId}

        </p>

      </div>




      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">


        <StatCard
          title="Total Objects"
          value={analytics?.total_objects ?? 0}
          icon={Boxes}
          color="bg-blue-600"
        />



        <StatCard
          title="Total Events"
          value={analytics?.total_events ?? 0}
          icon={Activity}
          color="bg-red-600"
        />



        <StatCard
          title="Average Confidence"
          value={
            analytics?.average_confidence !== undefined
              ? `${(
                  analytics.average_confidence * 100
                ).toFixed(2)}%`
              :
              "0%"
          }
          icon={Percent}
          color="bg-green-600"
        />



        <StatCard
          title="Most Detected"
          value={
            analytics?.most_detected_object || "-"
          }
          icon={Trophy}
          color="bg-purple-600"
        />


      </div>





      <ChartCard
        title="Object Distribution"
        type="pie"
        data={chartData}
      />



    </div>

  );

}


export default Analytics;