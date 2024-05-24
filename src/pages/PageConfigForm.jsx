import { useMemo } from "react";

import { Grid } from "@mui/material";
import PropTypes from "prop-types";

import CustomDropdown from "~/components/CustomDropdown";
import CustomTextarea from "~/components/CustomTextArea";
import CustomTextField from "~/components/CustomTextField";
import SelectImageButton from "~/components/SelectImageButton";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio"
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726"
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik"
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac"
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33"
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil"
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta"
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman"
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex"
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls"
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster"
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs"
  }
];

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
        <SelectImageButton label="Header Image" imageData={itemData || []} />
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
        <SelectImageButton label="BG Image" imageData={itemData || []} />
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
