import { Button, styled } from "@mui/material";
import PropTypes from "prop-types";

// Define a styled component for the button
const StyledButton = styled(Button)({
  backgroundColor: "white",
  color: "#000",
  margin: "8px",
  padding: "8px 20px",
  borderRadius: "2px",
  cursor: "pointer",
  textTransform: "capitalize",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "white"
  }
});

const CustomButton = ({ label, handleClick, ...rest }) => {
  return (
    <StyledButton onClick={handleClick} variant="contained" {...rest}>
      {label}
    </StyledButton>
  );
};

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default CustomButton;
