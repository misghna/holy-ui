import { useState, useEffect } from "react";

import axiosInstance from "~/services/utils/interceptor";

const useAxios = (config) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance(config);

        setResponse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return { response };
};

export default useAxios;
