import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  IconButton
} from "@mui/material";
import { node, bool, func, string } from "prop-types";

export default function DynamicModal({
  children,
  header,
  open,
  handleClose,
  maxWidth = "sm",
  handleSubmit,
  hideFooter,
  hideTitle
}) {
  return (
    <Dialog open={open} maxWidth={maxWidth} onClose={handleClose}>
      {!hideTitle && (
        <>
          <DialogTitle>{header}</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <Close />
          </IconButton>
        </>
      )}
      <DialogContent dividers={true}>
        <DialogContentText tabIndex={-1}>
          <>{children}</>
        </DialogContentText>
      </DialogContent>
      {!hideFooter && (
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
DynamicModal.propTypes = {
  children: node,
  header: node,
  maxWidth: string,
  open: bool,
  handleClose: func,
  handleSubmit: func,
  hideFooter: bool,
  hideTitle: bool
};
