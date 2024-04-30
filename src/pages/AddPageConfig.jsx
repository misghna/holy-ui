import { useMemo } from "react";

import { Grid } from "@mui/material";
import PropTypes from "prop-types";

import CustomDropdown from "~/components/CustomDropdown";
import CustomTextarea from "~/components/CustomTextArea";
import CustomTextField from "~/components/CustomTextField";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";
import { useGridData } from "~/contexts/GridDataProvider";
import { capitalizeFirstLetter } from "~/utils/settingsService";

const options = [];
function removeDuplicate(contents, key) {
  const unique = contents.reduce((accumulator, currentValue) => {
    const isDuplicate = accumulator.some((item) => item[key] === currentValue[key]);

    if (!isDuplicate) {
      accumulator.push(currentValue);
    }

    return accumulator;
  }, []);
  return unique || [];
}

const AddPageConfig = ({ pageConfig, handleChange, errors }) => {
  const { contents } = useGridData();
  const { setting } = useGlobalSetting();

  const uniquePageTypeOptions = useMemo(
    () =>
      removeDuplicate(contents, "type").map((content) => {
        const { type } = content;
        return {
          label: capitalizeFirstLetter(type),
          value: type
        };
      }),
    [contents]
  );

  const uniqueParentOptions = useMemo(
    () =>
      removeDuplicate([...contents], "title").map((content) => {
        const { id, title } = content;
        return {
          label: capitalizeFirstLetter(title),
          value: id
        };
      }),
    [contents]
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
        <CustomTextField
          label="Order Number"
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
