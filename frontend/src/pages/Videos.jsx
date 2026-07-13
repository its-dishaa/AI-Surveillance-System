import { useNavigate } from "react-router-dom";

import {
  VideosAPI,
  DeleteVideoAPI,
} from "../api/api";

import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import VideoCard from "../components/VideoCard";


function Videos() {


  const navigate = useNavigate();



  const {
    data: videos,
    loading,
    error,
    refresh,
  } = useFetch(VideosAPI);





  const handleDelete = async (id) => {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );


    if (!confirmDelete) return;



    try {


      await DeleteVideoAPI(id);


      refresh();



    } catch (err) {


      console.error(err);


      alert("Failed to delete video.");


    }


  };





  const handleView = (video) => {


    navigate(`/analytics?video=${video.id}`);


  };





  if (loading) {


    return <Loading text="Loading videos..." />;


  }





  if (error) {


    return (

      <div className="
        rounded-lg
        border
        border-red-200
        bg-red-100
        p-4
        text-red-700
      ">

        Failed to load videos.

      </div>

    );


  }






  return (


    <div className="space-y-8">



      {/* Header */}


      <div>


        <h1 className="text-3xl font-bold ">

          Videos

        </h1>



        <p className="mt-1 text-gray-500">

          View and manage uploaded surveillance videos.

        </p>



      </div>







      {/* Videos List */}


      {!videos || videos.length === 0 ? (


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


          No videos available.


        </div>



      ) : (



        <div className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        ">


          {videos.map((video) => (


            <VideoCard

              key={video.id}

              video={video}

              onDelete={handleDelete}

              onView={handleView}

            />


          ))}



        </div>



      )}



    </div>


  );


}


export default Videos;