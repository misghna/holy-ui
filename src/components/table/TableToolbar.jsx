import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

import DynamicModal from "~/components/Modal";

const TableToolbar = (props) => {
  const { addUserHandler, tableTitle, children, modalOpen, handleClickOpen, handleCloseModal } = props;

  return (
    <Toolbar
      sx={{
        paddingLeft: 2,
        paddingRight: 1
      }}
    >
      <>
        <Tooltip title="Add">
          <IconButton aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <DynamicModal
          open={modalOpen}
          action={addUserHandler}
          handleClose={handleCloseModal}
          actionLabel="Save"
          header={"Add Page Config"}
          maxWidth="md"
        >
          {children}
        </DynamicModal>
      </>

      <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle">
        {tableTitle}
      </Typography>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  addUserHandler: PropTypes.func.isRequired,
  tableTitle: PropTypes.string,
  children: PropTypes.node,
  modalOpen: PropTypes.bool,
  handleClickOpen: PropTypes.func,
  handleCloseModal: PropTypes.func
};

export default TableToolbar;
