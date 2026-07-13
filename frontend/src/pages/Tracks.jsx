import { useState } from "react";
import { Search } from "lucide-react";

import {
  TracksAPI,
  TrackPointsAPI,
} from "../api/api";

import Loading from "../components/Loading";
import TrackTable from "../components/TrackTable";


function Tracks() {


  const [videoId, setVideoId] = useState("");

  const [tracks, setTracks] = useState([]);

  const [trackPoints, setTrackPoints] = useState([]);

  const [selectedTrack, setSelectedTrack] = useState(null);



  const [loading, setLoading] = useState(false);

  const [pointsLoading, setPointsLoading] = useState(false);

  const [error, setError] = useState("");





  const loadTracks = async () => {


    if (!videoId.trim()) {


      alert("Please enter a Video ID.");

      return;


    }



    try {


      setLoading(true);

      setError("");

      setSelectedTrack(null);

      setTrackPoints([]);



      const response = await TracksAPI(videoId);



      console.log("Tracks response:", response.data);



      const data = response.data;



      if (Array.isArray(data)) {

        setTracks(data);

      }

      else if (data?.tracks) {

        setTracks(data.tracks);

      }

      else {

        setTracks([]);

      }



    } catch (err) {


      console.error("Tracks error:", err);


      setError("Failed to load tracks.");

      setTracks([]);


    }
    finally {


      setLoading(false);


    }


  };








  const viewTrackPoints = async (track) => {


    try {


      setSelectedTrack(track);

      setPointsLoading(true);



      const response = await TrackPointsAPI(track.id);



      console.log(
        "Track points response:",
        response.data
      );



      const data = response.data;



      if (Array.isArray(data)) {


        setTrackPoints(data);


      }

      else if (data?.points) {


        setTrackPoints(data.points);


      }

      else {


        setTrackPoints([]);


      }



    }
    catch(err) {


      console.error(
        "Track points error:",
        err
      );


      alert(
        "Failed to load track points."
      );


      setTrackPoints([]);


    }
    finally {


      setPointsLoading(false);


    }


  };








  return (

    <div className="space-y-8">



      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold ">

          Tracks

        </h1>


        <p className="mt-2 text-gray-500">

          View object tracks and trajectory points.

        </p>


      </div>







      {/* Search */}


      <div className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-6
        shadow
      ">


        <div className="
          flex
          flex-col
          gap-4
          md:flex-row
        ">


          <input

            type="number"

            placeholder="Enter Video ID"

            value={videoId}

            onChange={(e)=>
              setVideoId(e.target.value)
            }

            className="
              flex-1
              rounded-lg
              border
              px-4
              py-2
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "

          />



          <button

            onClick={loadTracks}

            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-blue-600
              px-6
              py-2
              text-white
              hover:bg-blue-700
            "

          >

            <Search size={18}/>

            Load Tracks


          </button>


        </div>


      </div>







      {loading && (

        <Loading text="Loading tracks..." />

      )}






      {error && (

        <div className="
          rounded-lg
          border
          border-red-200
          bg-red-100
          p-4
          text-red-700
        ">

          {error}

        </div>

      )}








      {!loading && tracks.length > 0 && (

        <TrackTable

          tracks={tracks}

          onViewPoints={viewTrackPoints}

        />

      )}







      {!loading && tracks.length === 0 && videoId && (

        <div className="
          rounded-xl
          border
          bg-white
          p-6
          text-center
          text-gray-500
        ">

          No tracks found for this video.

        </div>

      )}







      {selectedTrack && (

        <div className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-6
          shadow
        ">



          <div className="
            mb-5
            flex
            items-center
            justify-between
          ">


            <h2 className="text-xl font-semibold">

              Track #{selectedTrack.id} Points

            </h2>



            <span className="text-sm text-gray-500">

              Video ID: {selectedTrack.video_id}

            </span>


          </div>







          {pointsLoading ? (

            <Loading text="Loading track points..." />

          ) : trackPoints.length === 0 ? (


            <p className="text-gray-500">

              No points available.

            </p>


          ) : (


            <div className="overflow-x-auto">


              <table className="
                min-w-full
                border
                border-gray-200
              ">


                <thead className="bg-gray-100">


                  <tr>

                    <th className="px-4 py-2 text-left">
                      #
                    </th>


                    <th className="px-4 py-2 text-left">
                      X
                    </th>


                    <th className="px-4 py-2 text-left">
                      Y
                    </th>


                    <th className="px-4 py-2 text-left">
                      Frame
                    </th>


                  </tr>


                </thead>





                <tbody>


                  {trackPoints.map(
                    (point,index)=>(


                    <tr

                      key={point.id ?? index}

                      className="border-t"

                    >


                      <td className="px-4 py-2">

                        {index+1}

                      </td>



                      <td className="px-4 py-2">

                        {point.x ?? "-"}

                      </td>



                      <td className="px-4 py-2">

                        {point.y ?? "-"}

                      </td>



                      <td className="px-4 py-2">

                        {
                          point.frame_number ??
                          point.frame ??
                          "-"
                        }

                      </td>


                    </tr>


                  ))}


                </tbody>


              </table>


            </div>


          )}


        </div>


      )}


    </div>


  );


}


export default Tracks;