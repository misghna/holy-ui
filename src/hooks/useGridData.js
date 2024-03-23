import { useState, useCallback, useEffect } from "react";

import { getGridData } from "../services/gridData";

const useGridData = (partialUrl) => {
  const [cardData, setCardData] = useState([]);

  const fetchData = useCallback(async () => {
    const data = await getGridData(partialUrl);

    setCardData(data);
  }, [partialUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { cardData };
};
export default useGridData;
