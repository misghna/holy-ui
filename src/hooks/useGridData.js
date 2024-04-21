import { useEffect, useState } from "react";

import { axiosPrivate } from "~/_api";

const useGridData = (url) => {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`/api/${url}`);
        setCardData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);

  return { cardData };
};

export default useGridData;
