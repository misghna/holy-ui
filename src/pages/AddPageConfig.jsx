import { Grid } from "@mui/material";

import CustomDropdown from "~/components/CustomDropdown";
import CustomTextarea from "~/components/CustomTextArea";
import CustomTextField from "~/components/CustomTextField";

const AddPageConfig = () => {
  const options = [
    { label: "option1fdsfddasdsd", value: "option1cfsdsdsdsadsa" },
    { label: "option2", value: "option2" },
    { label: "option3", value: "option3" }
  ];
  return (
    <Grid container spacing={2} alignItems="baseline">
      <Grid item xs={12} sm={6}>
        <CustomDropdown label="Page Type" options={options} fullWidth />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField label="Name" fullWidth />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField label="Header Name" fullWidth />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomDropdown label="Image Link" options={options} fullWidth />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomDropdown label="Parent Image" options={options} fullWidth />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomDropdown label="Language" options={options} fullWidth />
      </Grid>

      <Grid item xs={12}>
        <CustomTextarea label="description" />
      </Grid>
    </Grid>
  );
};

export default AddPageConfig;
