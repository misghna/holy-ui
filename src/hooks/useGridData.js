import { useState, useEffect, useRef } from "react";

import useAxiosPrivate from "./useAxiosPrivate";

const useGridData = (url) => {
  const [cardData, setCardData] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`/api/${url}`);
        setCardData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [axiosPrivate, url]);

  return { cardData };
};

export default useGridData;
