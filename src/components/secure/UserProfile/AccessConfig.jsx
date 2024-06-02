import { useCallback, useEffect, useMemo, useState } from "react";

import PropTypes from "prop-types";

import { axiosPrivate } from "~/_api";
import Loading from "~/components/Loading";
import EnhancedTable from "~/components/table/EnhancedTable";
import config from "~/constants/endpoints.json";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const AccessConfig = ({ populateAccessConfigForm, deleteAccessConfig }) => {
  const [tableData, setTableData] = useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback((start, limit) => {
    axiosPrivate
      .get(`/api/protected/${currentConfig.userProfileAccessConfig}`, {
        // .get(`https://api.npoint.io/0e2564f437aab98b0dd0`, {
        params: {
          start,
          limit
        }
      })
      .then(({ data }) => {
        console.log("🚀 ~ .then ~ data:", data);
        setTableData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error :>> ", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("{fetchData} :>> ", { fetchData });
    fetchData(0, 100);
  }, [fetchData]);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setTableData((old) =>
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
  const memorizedColumns = useMemo(() => {
    if (tableData?.columns && tableData.columns?.length > 0) {
      const formattedColumns = tableData.columns.map((column) => {
        return {
          Header: column.name,
          accessor: column.value
        };
      });
      formattedColumns.push({ Header: "Actions", accessor: "actions" });
      return formattedColumns;
    }
    return [];
  }, [tableData?.columns]);

  if (loading) {
    return <Loading />;
  }
  return (
    <EnhancedTable
      columns={memorizedColumns}
      data={tableData?.data || []}
      fetchData={fetchData}
      setData={setTableData}
      updateMyData={updateMyData}
      skipPageReset={skipPageReset}
      deleteAction={deleteAccessConfig}
      shouldVisibleToolbar={true}
      populateForm={populateAccessConfigForm}
    />
  );
};
AccessConfig.propTypes = {
  deleteAccessConfig: PropTypes.func,
  populateAccessConfigForm: PropTypes.func,
  handleAddModalOpen: PropTypes.func
};

export default AccessConfig;
