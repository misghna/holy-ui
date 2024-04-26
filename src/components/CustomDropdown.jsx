import { FormControl, Typography, Select, MenuItem, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";

const CustomDropdown = ({ label, helperText, options, handleChange, ...rest }) => {
  return (
    <FormControl fullWidth>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
        <Typography style={{ marginRight: "8px", whiteSpace: "nowrap", minWidth: "100px" }}>{label}</Typography>
        <Select
          {...rest}
          onChange={handleChange}
          sx={{
            "& select": {
              flex: "1",
              padding: "10px",
              fontWeight: "bold",
              border: "1px solid #ced4da",
              borderRadius: "4px",
              color: "#333",
              height: "40px"
            }
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

CustomDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default CustomDropdown;
