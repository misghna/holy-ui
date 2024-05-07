import { useMemo } from "react";

import { Grid } from "@mui/material";
import PropTypes from "prop-types";

import CustomDropdown from "~/components/CustomDropdown";
import CustomTextarea from "~/components/CustomTextArea";
import CustomTextField from "~/components/CustomTextField";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";

const PageConfigForm = ({ pageConfig, handleChange, errors }) => {
  const { setting } = useGlobalSetting();

  const uniquePageTypeOptions = useMemo(
    () =>
      setting.page_types.map((content) => {
        const { key, value } = content;
        return {
          label: value,
          value: key
        };
      }),
    [setting.page_types]
  );

  const uniqueParentOptions = useMemo(
    () =>
      setting.content_pages.map((content) => {
        const { id, name } = content;
        return {
          label: name,
          value: id
        };
      }),
    [setting.content_pages]
  );
  const languagesOptions = useMemo(
    () =>
      setting.langs.map((lang) => {
        const { id, name } = lang;

        return {
          label: name,
          value: id
        };
      }),
    [setting.langs]
  );
  return (
    <Grid container spacing={2} alignItems="baseline">
      <Grid item xs={12} sm={6}>
        <CustomDropdown
          label="Page Type"
          options={uniquePageTypeOptions}
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
        <CustomTextField
          label="Header Image"
          fullWidth
          name="headerImage"
          value={pageConfig.headerImage}
          handleChange={handleChange}
          helperText={(errors && errors?.headerText) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomDropdown
          label="Parent"
          options={uniqueParentOptions}
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
          options={languagesOptions}
          fullWidth
          name="language"
          value={pageConfig.language}
          handleChange={handleChange}
          helperText={(errors && errors?.language) || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDropdown
          label="BG Image"
          options={[]}
          fullWidth
          name="imageLink"
          value={pageConfig.imageLink}
          handleChange={handleChange}
          helperText={(errors && errors?.imageLink) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label="Sequence No"
          type="number"
          fullWidth
          name="orderNumber"
          value={pageConfig.orderNumber}
          handleChange={handleChange}
          helperText={(errors && errors?.headerText) || ""}
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        <CustomTextarea
          label="Description"
          name="description"
          value={pageConfig.description}
          handleChange={handleChange}
          helperText={(errors && errors?.description) || ""}
        />
      </Grid>
    </Grid>
  );
};
PageConfigForm.propTypes = {
  pageConfig: PropTypes.object.isRequired,

  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default PageConfigForm;
