import { Grid } from "@mui/material";
import PropTypes from "prop-types";

import CustomDropdown from "~/components/CustomDropdown";
import CustomTextField from "~/components/CustomTextField";

const PERMISSION_OPTIONS = [
  {
    label: "None",
    value: "N"
  },
  { label: "Read", value: "R" },
  { label: "Read/Write", value: "RW" }
];
const AccessConfigForm = ({ formData, handleChange, errors }) => {
  console.log("🚀 ~ AccessConfigForm ~ formData:", formData);
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

      <Grid item xs={12} sm={6}>
        <CustomDropdown
          defaultValue="N"
          label="Content Manager"
          options={PERMISSION_OPTIONS}
          fullWidth
          name="content_manager"
          value={formData.content_manager}
          handleChange={handleChange}
          helperText={(errors && errors?.content_manager) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomDropdown
          defaultValue="N"
          label="Finance"
          options={PERMISSION_OPTIONS}
          fullWidth
          name="finance"
          value={formData.finance}
          handleChange={handleChange}
          helperText={(errors && errors?.finance) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomDropdown
          defaultValue="N"
          label="Admin Settings"
          options={PERMISSION_OPTIONS}
          fullWidth
          name="admin_settings"
          value={formData.admin_settings}
          handleChange={handleChange}
          helperText={(errors && errors?.admin_settings) || ""}
        />
      </Grid>
    </Grid>
  );
};
AccessConfigForm.propTypes = {
  formData: PropTypes.object.isRequired,

  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default AccessConfigForm;
