import React, { useCallback, useEffect, useState } from "react";

import PropTypes from "prop-types";

import { axiosPrivate } from "~/_api";
import Loading from "~/components/Loading";
import EnhancedTable from "~/components/table/EnhancedTable";
import config from "~/constants/endpoints.json";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const COLUMNS = [
  {
    Header: "ID",
    accessor: "id"
  },
  {
    Header: "Key",
    accessor: "Key"
  },
  { Header: "Language", accessor: "language" },

  {
    Header: "Tenant Name",
    accessor: "tenant_name"
  },
  {
    Header: "English",
    accessor: "English"
  },
  {
    Header: "Tigrinia",
    accessor: "\u1275\u130d\u122d\u129b"
  },
  {
    Header: "Spanish",
    accessor: "\u0639\u0631\u0628\u064a"
  },

  {
    Header: "Updated By",
    accessor: "updated_by"
  },

  {
    Header: "Action",
    accessor: "action"
  }
];

const Dictionary = ({ populateDictionaryForm, deleteDictionary }) => {
  const [data, setData] = React.useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback((start, limit) => {
    console.log("Fetching data with params:", { start, limit });
    axiosPrivate
      .get(`/api/protected/${currentConfig.dictionaries}`, {
        params: {
          start,
          limit
        }
      })
      .then(({ data }) => {
        console.log("Fetched dictionary data:", data);
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("useEffect called, fetching data");
    fetchData(0, 100);
  }, [fetchData]);

  const updateMyData = (rowIndex, columnId, value) => {
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
    return <Loading />;
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
        deleteAction={deleteDictionary}
        shouldVisibleToolbar={true}
        populateForm={populateDictionaryForm}
      />
    </div>
  );
};

Dictionary.propTypes = {
  deleteDictionary: PropTypes.func,
  populateDictionaryForm: PropTypes.func,
  handleAddModalOpen: PropTypes.func
};

export default Dictionary;
