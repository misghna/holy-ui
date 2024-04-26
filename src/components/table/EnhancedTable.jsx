import { useCallback, useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import MaUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import PropTypes from "prop-types";
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from "react-table";

import TablePaginationActions from "~/components/table/TablePaginationActions";
import TableToolbar from "~/components/table/TableToolbar";
import AddPageConfig from "~/pages/AddPageConfig";

const EditableCell = ({
  value: initialValue,

  column: { type } // options for select and dropdown, type for different input types
}) => {
  const value = initialValue;

  const updatedValue = type === "date" ? new Date(Number(value)).toLocaleDateString() : value;
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
  formAction,
  deleteAction,
  shouldVisibleToolbar = true,
  pageConfig,
  handleChange,
  populateForm
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,

    state: { pageIndex, pageSize }
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

  const handleClickOpen = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  const deleteUserHandler = (event) => {
    console.log(event);
  };

  const handleEdit = (row) => {
    populateForm(row);
    handleClickOpen();
  };
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
    <TableContainer>
      {shouldVisibleToolbar ? (
        <TableToolbar
          modalOpen={modalOpen}
          handleCloseModal={handleCloseModal}
          handleClickOpen={handleClickOpen}
          deleteUserHandler={deleteUserHandler}
          addUserHandler={formAction}
          tableTitle="Page Config"
        >
          <AddPageConfig pageConfig={pageConfig} handleChange={handleChange} />
        </TableToolbar>
      ) : null}
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, index) => (
            <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <TableCell
                  key={index}
                  {...(column.id === "selection"
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                  style={{ whiteSpace: "nowrap" }} // Ensure content does not wrap
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
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow key={i} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  if (index === row.cells.length - 1) {
                    // Render actions in the last cell
                    return (
                      <TableCell key={index}>
                        <IconButton onClick={() => handleEdit(row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(row)}>
                          <DeleteIcon />
                        </IconButton>
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

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: data.length }]}
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
      </MaUTable>
    </TableContainer>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  updateMyData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  skipPageReset: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  formAction: PropTypes.func,
  deleteAction: PropTypes.func,
  shouldVisibleToolbar: PropTypes.bool,
  pageConfig: PropTypes.object,
  handleChange: PropTypes.func,
  populateForm: PropTypes.func
};

export default EnhancedTable;
