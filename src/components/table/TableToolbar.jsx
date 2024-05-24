import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";

import GlobalFilter from "./GlobalFilter";

const TableToolbar = (props) => {
  const { preGlobalFilteredRows, setGlobalFilter, globalFilter } = props;

  return (
    <Toolbar
      sx={{
        paddingLeft: 2,
        paddingRight: 1
      }}
    >
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  preGlobalFilteredRows: PropTypes.array,
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired
};

export default TableToolbar;
