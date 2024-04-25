import { FormControl, Typography, TextareaAutosize, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";
const CustomTextarea = ({ label, helperText, ...rest }) => {
  return (
    <FormControl fullWidth>
      <Typography style={{ marginBottom: "8px", whiteSpace: "nowrap", minWidth: "100px" }}>{label}</Typography>
      <TextareaAutosize
        {...rest}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ced4da",

          borderRadius: "4px",
          color: "#333",
          minHeight: "100px", // Set the minimum height
          resize: "vertical" // Allow vertical resizing
        }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

CustomTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string
};

export default CustomTextarea;
