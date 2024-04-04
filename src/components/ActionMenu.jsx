import MenuIcon from "@mui/icons-material/Menu";
import { Menu } from "@mui/material";
import PropTypes from "prop-types";

function ActionMenu({ children, handleClick, handleClose, anchorEl }) {
  return (
    <div>
      <MenuIcon onClick={handleClick} />
      <Menu id="action-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {children}
      </Menu>
    </div>
  );
}
ActionMenu.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.object
};

export default ActionMenu;
