import { Grid } from "@mui/material";
import PropTypes from "prop-types";

import CustomDropdown from "~/components/CustomDropdown";
import CustomTextarea from "~/components/CustomTextArea";
import CustomTextField from "~/components/CustomTextField";
const options = [
  { label: "option1fdsfddasdsd", value: "option1cfsdsdsdsadsa" },
  { label: "option2", value: "option2" },
  { label: "option3", value: "option3" }
];
const AddPageConfig = ({ pageConfig, handleChange, errors }) => {
  return (
    <Grid container spacing={2} alignItems="baseline">
      <Grid item xs={12} sm={6}>
        <CustomDropdown
          label="Page Type"
          options={options}
          fullWidth
          name="pageType"
          value={pageConfig.pageType}
          handleChange={handleChange}
          helperText={(errors && errors?.pageType) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="Name"
          fullWidth
          name="name"
          value={pageConfig.name}
          handleChange={handleChange}
          helperText={(errors && errors?.name) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="Header Text"
          fullWidth
          name="headerText"
          value={pageConfig.headerText}
          handleChange={handleChange}
          helperText={(errors && errors?.headerText) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomDropdown
          label="Image Link"
          options={options}
          fullWidth
          name="imageLink"
          value={pageConfig.imageLink}
          handleChange={handleChange}
          helperText={(errors && errors?.imageLink) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomDropdown
          label="Parent"
          options={options}
          fullWidth
          name="parent"
          value={pageConfig.parent}
          handleChange={handleChange}
          helperText={(errors && errors?.parent) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomDropdown
          label="Language"
          options={options}
          fullWidth
          name="language"
          value={pageConfig.language}
          handleChange={handleChange}
          helperText={(errors && errors?.language) || ""}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextarea
          label="description"
          name="description"
          value={pageConfig.description}
          handleChange={handleChange}
          helperText={(errors && errors?.description) || ""}
        />
      </Grid>
    </Grid>
  );
};
AddPageConfig.propTypes = {
  pageConfig: PropTypes.object.isRequired,

  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default AddPageConfig;
