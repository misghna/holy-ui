import { createContext, useCallback, useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { axiosPrivate } from "~/_api";
import config from "~/constants/endpoints.json";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

// Create a new context
const GridDataContext = createContext();

export const useGridData = () => useContext(GridDataContext);

export const GridDataProvider = ({ children }) => {
  const [contents, setContents] = useState([]);
  const { category = "home" } = useParams();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
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
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <GridDataContext.Provider value={{ contents, loading }}>{children}</GridDataContext.Provider>;
};

GridDataProvider.propTypes = {
  children: PropTypes.node
};
