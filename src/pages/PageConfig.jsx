import React, { useCallback, useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";

import { axiosPrivate } from "~/_api";
import Loading from "~/components/Loading";
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
    Header: "Language",
    accessor: "language"
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
const tableInitialState = {
  pageIndex: 0,
  pageSize: 10
};

const PageConfig = ({ populatePageConfigForm, deletePageConfig }) => {
  const [data, setData] = React.useState([]);

  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState();
  const callFirstTimeOnly = useRef(false);

  const fetchData = useCallback((start, limit) => {
    axiosPrivate
      .get(`/api/protected/${currentConfig.pageConfigs}`, {
        params: {
          start,
          limit
        }
      })
      .then(({ data }) => {
        setData(data.data);
        setTotalRows(data.totalRows);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error :>> ", err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (!callFirstTimeOnly.current) {
      callFirstTimeOnly.current = true;
      fetchData(0, 10);
    }
  }, [fetchData]);

  if (loading) {
    return <Loading />;
  }

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page

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

  return (
    <div>
      <EnhancedTable
        columns={COLUMNS}
        data={data}
        fetchData={fetchData}
        setData={setData}
        updateMyData={updateMyData}
        deleteAction={deletePageConfig}
        shouldVisibleToolbar={true}
        populateForm={populatePageConfigForm}
        totalRows={totalRows}
        tableInitialState={tableInitialState}
      />
    </div>
  );
};
PageConfig.propTypes = {
  deletePageConfig: PropTypes.func,
  populatePageConfigForm: PropTypes.func,
  handleAddModalOpen: PropTypes.func
};

export default PageConfig;
