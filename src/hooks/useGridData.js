import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { axiosPrivate } from "~/_api";
import config from "~/constants/endpoints.json";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const useGridData = () => {
  const [contents, setContents] = useState([]);
  const { category = "home" } = useParams();
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    axiosPrivate
      .get(`/api/${currentConfig.contentData}`, {
        params: {
          content_category: category,
          lang: "english",
          start: 0
        }
      })
      .then(({ data }) => {
        setContents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error :>> ", err);
        setLoading(false);
      });
  };

  useEffect(fetchData, [category]);
  return { contents, loading };
};

export default useGridData;
