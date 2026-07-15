import { useState } from "react";
import { PlayCircle } from "lucide-react";

import StreamPlayer from "../components/StreamPlayer";
import { useSearchParams } from "react-router-dom";
import { StreamAPI } from "../api/api";

function Streaming() {

  const [videoId, setVideoId] = useState("");

  const [streamId, setStreamId] = useState("");



  const handleSubmit = (e) => {

    e.preventDefault();


    if (!videoId.trim()) {

      alert("Please enter a Video ID.");

      return;

    }


    setStreamId(videoId);


  };



  return (

    <div className="space-y-8">


      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold ">

          Video Streaming

        </h1>


        <p className="mt-2 text-gray-500">

          View the processed MJPEG stream for a surveillance video.

        </p>


      </div>





      {/* Video ID Form */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">


        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 md:flex-row"
        >


          <input

            type="number"

            min="1"

            value={videoId}

            onChange={(e) =>
              setVideoId(e.target.value)
            }

            placeholder="Enter Video ID"

            className="
              flex-1
              rounded-lg
              border
              border-gray-300
              px-4
              py-2
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500
            "

          />



          <button

            type="submit"

            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-blue-600
              px-6
              py-2
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "

          >

            <PlayCircle size={18}/>

            Start Stream

          </button>



        </form>


      </div>





      {/* Stream */}

      <StreamPlayer videoId={streamId}/>



    </div>

  );

}


export default Streaming;