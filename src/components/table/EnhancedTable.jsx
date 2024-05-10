import { useCallback, useEffect } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import PropTypes from "prop-types";
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from "react-table";

import NoData from "~/components/NoData";
import TablePaginationActions from "~/components/table/TablePaginationActions";
import TableToolbar from "~/components/table/TableToolbar";


const EditableCell = ({
  value: initialValue,

  column: { type } // options for select and dropdown, type for different input types
}) => {
  const value = initialValue;

  const updatedValue = type === "date" ? new Date(value).toLocaleDateString() : value;
  return updatedValue;
};

EditableCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.any.isRequired
  }),

  column: PropTypes.shape({
    id: PropTypes.number.isRequired
  })
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell
};

const EnhancedTable = ({
  columns,
  data,

  fetchData,
  updateMyData,
  skipPageReset,
  deleteAction,
  shouldVisibleToolbar = true,
  populateForm
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const handleChangePage = useCallback(
    (event, newPage) => {
      gotoPage(newPage);
    },
    [gotoPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      setPageSize(Number(event.target.value));
    },
    [setPageSize]
  );

  const handleEdit = useCallback(
    (row) => {
      populateForm(row);
    },
    [populateForm]
  );
  const handleDelete = useCallback(
    (row) => {
      deleteAction(row);
    },
    [deleteAction]
  );
  useEffect(() => {
    fetchData(pageIndex, pageSize);
  }, [fetchData, pageIndex, pageSize]);

  return (
    <>
      {shouldVisibleToolbar ? (
        <TableToolbar
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
        />
      ) : null}
      <TableContainer>
        <MuiTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell
                    key={index}
                    {...(column.id === "selection"
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                    style={{ whiteSpace: "nowrap", fontWeight: "bold" }} // Ensure content does not wrap
                  >
                    {column.render("Header")}
                    {column.id !== "selection" ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? "desc" : "asc"}
                      />
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          {page.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length / 2} align="center">
                <Box display="flex" alignItems="flex-start" justifyContent="flex-start" flexGrow={1}>
                  <NoData />
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            <TableBody>
              {page &&
                page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <TableRow
                      key={i}
                      {...row.getRowProps()}
                      sx={{ backgroundColor: i % 2 === 0 ? "#f4f4f4" : "white" }}
                    >
                      {row.cells.map((cell, index) => {
                        if (index === row.cells.length - 1) {
                          // Render actions in the last cell

                          return (
                            <TableCell key={index}>
                              <PopupState variant="popover" popupId={cell.row.id}>
                                {(popupState) => (
                                  <>
                                    <MoreVertIcon variant="contained" {...bindTrigger(popupState)} />
                                    <Menu {...bindMenu(popupState)}>
                                      <MenuItem
                                        onClick={() => {
                                          handleEdit(row);
                                          popupState.close();
                                        }}
                                      >
                                        <EditIcon sx={{ marginRight: 1 }} /> Edit
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => {
                                          handleDelete(row);
                                          popupState.close();
                                        }}
                                      >
                                        <DeleteIcon sx={{ marginRight: 1 }} /> Delete
                                      </MenuItem>
                                    </Menu>
                                  </>
                                )}
                              </PopupState>
                            </TableCell>
                          );
                        } else {
                          // Render regular cell
                          return (
                            <TableCell key={index} {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          )}

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 100, { label: "All", value: data.length }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                slotProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </MuiTable>
      </TableContainer>
    </>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  updateMyData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  skipPageReset: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,

  deleteAction: PropTypes.func,
  shouldVisibleToolbar: PropTypes.bool,
  pageConfig: PropTypes.object,
  handleChange: PropTypes.func,
  populateForm: PropTypes.func,
  formDialog: PropTypes.node
};

export default EnhancedTable;
