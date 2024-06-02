import { FormControl, Typography, Select, MenuItem, FormHelperText, styled, Box } from "@mui/material";
import PropTypes from "prop-types";

const StyledTypography = styled(Typography)({
  marginRight: "8px",
  whiteSpace: "nowrap",
  minWidth: "100px",
  textTransform: "capitalize"
});

const StyledSelect = styled(Select)({
  flex: "1",
  padding: "10px",

  border: "1px solid #ced4da",
  borderRadius: "4px",
  color: "#333",
  height: "40px",
  "& select": {
    appearance: "none",
    WebkitAppearance: "none"
  }
});

const CustomDropdown = ({ label, helperText, options, handleChange, ...rest }) => {
  return (
    <FormControl fullWidth>
      <Box display="flex" alignItems="center" flexWrap="nowrap">
        <StyledTypography>{label}</StyledTypography>
        <StyledSelect onChange={handleChange} {...rest}>
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledSelect>
      </Box>
      {helperText && (
        <FormHelperText error={Boolean(helperText)} sx={{ alignSelf: "center" }}>
          {helperText}
        </FormHelperText>
      )}
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
