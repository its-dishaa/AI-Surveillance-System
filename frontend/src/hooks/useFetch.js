import { useEffect, useState } from "react";


function useFetch(apiFunction) {


  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);



  const fetchData = async () => {


    if (!apiFunction) {

      setLoading(false);

      return;

    }


    try {

      setLoading(true);

      setError(null);


      const response = await apiFunction();


      setData(response.data);


    } catch (err) {


      console.error(err);

      setError(err);


    } finally {


      setLoading(false);


    }


  };




  useEffect(() => {


    fetchData();


  }, [apiFunction]);




  return {

    data,

    loading,

    error,

    refresh: fetchData,

  };


}


export default useFetch;