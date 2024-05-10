import { FormControl, Typography, TextareaAutosize, FormHelperText, styled } from "@mui/material";
import PropTypes from "prop-types";

const StyledTypography = styled(Typography)({
  marginBottom: "8px",
  whiteSpace: "nowrap",
  minWidth: "100px",
  textTransform: "capitalize"
});

const StyledTextareaAutosize = styled(TextareaAutosize)({
  maxWidth: "90%",
  padding: "10px",
  border: "1px solid #ced4da",
  borderRadius: "4px",
  color: "#333",
  resize: "vertical",
  "&:focus": {
    outline: "none"
  }
});

const CustomTextarea = ({ label, helperText, handleChange, ...rest }) => {
  return (
    <FormControl fullWidth>
      <StyledTypography>{label}</StyledTypography>
      <StyledTextareaAutosize onChange={handleChange} {...rest} minRows={4} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

CustomTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default CustomTextarea;
