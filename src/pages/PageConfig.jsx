import React, { useCallback, useEffect } from "react";

import { Box, CircularProgress } from "@mui/material";

import { axiosPrivate } from "~/_api";
import EnhancedTable from "~/components/table/EnhancedTable";
import config from "~/constants/endpoints.json";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const COLUMNS = [
  {
    Header: "Page Type",
    accessor: "page_type"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Description",
    accessor: "description"
  },
  {
    Header: "Image Link",
    accessor: "img_link"
  },
  {
    Header: "Parent",
    accessor: "parent"
  },
  {
    Header: "Header Image",
    accessor: "header_img"
  },
  {
    Header: "Header Text",
    accessor: "header_text"
  },
  {
    Header: "Updated By",
    accessor: "updated_by"
  },

  {
    Header: "Created At",
    accessor: "created_at",

    type: "date"
  },

  {
    Header: "Updated At",
    accessor: "updated_at",

    type: "date"
  },
  {
    Header: "Action",
    accessor: "action"
  }
];
const PageConfig = () => {
  const [data, setData] = React.useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const fetchData = useCallback((start, limit) => {
    axiosPrivate
      .get(`/api/secure/${currentConfig.pageConfig}`, {
        params: {
          limit,
          start
        }
      })
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error :>> ", err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetchData(0, 10);
  }, [fetchData]);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "calc(100dvh - 7.25rem)",
          width: "100%",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <EnhancedTable
        columns={COLUMNS}
        data={data}
        fetchData={fetchData}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>
  );
};

PageConfig.propTypes = {};
export default PageConfig;
