import { Modal } from "@mui/material";
import { node, bool, func } from "prop-types";

export default function DynamicModal({ children, open, handleClose }) {
  console.log("{open,handleClose} :>> ", { open, handleClose });

  return (
    <Modal open={open} onClose={handleClose}>
      {children}
    </Modal>
  );
}
DynamicModal.propTypes = {
  children: node,
  open: bool,
  handleClose: func
};
