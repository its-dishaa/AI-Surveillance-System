import { StreamAPI } from "../api/api";


function StreamPlayer({ videoId }) {


  if (!videoId) {

    return (

      <div className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-8
        text-center
        text-gray-500
        shadow
      ">

        Enter a video ID and click Start Stream.

      </div>

    );

  }



  return (

    <div className="
      rounded-xl
      border
      border-gray-200
      bg-white
      p-4
      shadow
    ">


      <h2 className="mb-4 text-xl font-semibold text-gray-800">

        Live Stream - Video #{videoId}

      </h2>


      <img

        src={StreamAPI(videoId)}

        alt={`Video stream ${videoId}`}

        className="
          w-full
          rounded-lg
          border
          border-gray-200
        "

      />



    </div>

  );


}


export default StreamPlayer;