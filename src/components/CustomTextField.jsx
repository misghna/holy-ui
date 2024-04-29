import { FormControl, Typography, InputBase, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";

const CustomTextField = ({ label, helperText, handleChange, ...rest }) => {
  return (
    <FormControl fullWidth>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
        <Typography style={{ marginRight: "8px", whiteSpace: "nowrap", minWidth: "100px" }}>{label}</Typography>
        <InputBase
          {...rest}
          onChange={handleChange}
          sx={{
            "& input": {
              flex: "1",
              padding: "10px",

              border: "1px solid #ced4da",
              borderRadius: "4px",
              color: "#333"
            }
          }}
        />
      </div>
      {helperText && (
        <FormHelperText error={Boolean(helperText)} sx={{ alignSelf: "center" }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
CustomTextField.propTypes = {
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default CustomTextField;
