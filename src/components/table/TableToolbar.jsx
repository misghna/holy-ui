import { useCallback, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

import DynamicModal from "~/components/Modal";
import AddPageConfig from "~/pages/AddPageConfig";

const TableToolbar = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    addUserHandler,

    tableTitle
  } = props;
  const handleClickOpen = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

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
          <AddPageConfig />
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

  tableTitle: PropTypes.string
};

export default TableToolbar;
