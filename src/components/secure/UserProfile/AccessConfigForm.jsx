import { Grid } from "@mui/material";
import PropTypes from "prop-types";

import CustomDropdown from "~/components/CustomDropdown";
import CustomTextField from "~/components/CustomTextField";
import { snakeCaseToReadable } from "~/helper/stringFormatting";

const PERMISSION_OPTIONS = [
  {
    label: "None",
    value: "N"
  },
  { label: "Read", value: "R" },
  { label: "Read/Write", value: "RW" }
];

const AccessConfigForm = ({ formData, handleChange, errors }) => {
  const handlePermissionChange = ({ target }) => {
    const { name, value } = target;
    handleChange({
      target: {
        name: "accessListChanged",
        value: {
          ...formData.accessListChanged,
          [name]: value
        }
      }
    });
  };
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="Name"
          fullWidth
          name="name"
          value={formData.name}
          handleChange={handleChange}
          helperText={(errors && errors?.name) || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="Email"
          fullWidth
          name="email"
          value={formData.email}
          handleChange={handleChange}
          helperText={(errors && errors?.email) || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="Phone Number"
          fullWidth
          name="phone_number"
          value={formData.phone_number}
          handleChange={handleChange}
          helperText={(errors && errors?.phone_number) || ""}
        />
      </Grid>
      {formData.access?.length > 0 &&
        formData.access?.map((field) => {
          const data = Object.entries(field);
          const [fieldName, value] = data?.at(0) || [];
          return fieldName ? (
            <Grid item xs={12} sm={6} key={fieldName}>
              <CustomDropdown
                defaultValue={value || "N"}
                label={snakeCaseToReadable(fieldName)}
                options={PERMISSION_OPTIONS}
                fullWidth
                name={fieldName}
                value={formData.accessListChanged?.[fieldName] || value || "N"}
                handleChange={handlePermissionChange}
                helperText={(errors && errors[fieldName]) || ""}
              />
            </Grid>
          ) : null;
        })}
    </Grid>
  );
};
AccessConfigForm.propTypes = {
  formData: PropTypes.object.isRequired,

  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default AccessConfigForm;
