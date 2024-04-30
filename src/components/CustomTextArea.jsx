import { FormControl, Typography, TextareaAutosize, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";

const CustomTextarea = ({ label, helperText, handleChange, ...rest }) => {
  return (
    <FormControl fullWidth>
      <Typography sx={{ marginBottom: "8px", whiteSpace: "nowrap", minWidth: "100px" }}>{label}</Typography>
      <TextareaAutosize
        {...rest}
        onChange={handleChange}
        sx={{
          maxWidth: "90%",
          padding: "10px",
          border: "1px solid #ced4da",
          borderRadius: "4px",
          color: "#333",
          resize: "vertical",

          "&:focus": {
            outline: "none" // Remove outline on focus
          }
        }}
        minRows={4}
      />
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
