import { useCallback, useEffect, useMemo, useState } from "react";

import { Grid } from "@mui/material";
import PropTypes from "prop-types";

import { axiosPrivate } from "~/_api";
import CustomDropdown from "~/components/CustomDropdown";
import CustomTextarea from "~/components/CustomTextArea";
import CustomTextField from "~/components/CustomTextField";
import SelectImageButton from "~/components/SelectImageButton";
import config from "~/constants/endpoints.json";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;
const PAGE_SIZE = 10;
const PageConfigForm = ({ pageConfig, handleChange, errors, addImageSelectionInPageConfig }) => {
  const [imageUrls, setImageUrls] = useState({});

  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [dataOffset, setDataOffset] = useState(0);

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

  const fetchImageList = useCallback((infiniteFetch) => {
    if (!infiniteFetch) {
      setLoading(true);
    }
    axiosPrivate
      .get(`/api/protected/${currentConfig.file_list}`, {
        params: {
          type: "image",
          start: infiniteFetch ? dataOffset + PAGE_SIZE : dataOffset,
          limit: PAGE_SIZE
        }
      })
      .then(async ({ data }) => {
        if (infiniteFetch) {
          setDataOffset((prevState) => prevState + PAGE_SIZE);

          if (data.length === 0) {
            setHasMore(false);
          }
        }
        await fetchImages(data);
        setImageList((prevState) => {
          return [...prevState, ...data];
        });
        console.log("here", infiniteFetch);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error :>> ", error);
        setHasMore(false);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchImages = useCallback(async (imageData) => {
    try {
      const requests = imageData.map((item) =>
        axiosPrivate.get(`https://holydemo.com/api/protected/file`, {
          params: {
            id: item.id,
            thumbnail: true
          },
          responseType: "blob"
        })
      );

      const responses = await Promise.all(requests);
      const urls = responses.reduce((acc, response, index) => {
        const imageUrl = URL.createObjectURL(response.data);
        acc[imageData[index].id] = imageUrl;
        return acc;
      }, {});

      setImageUrls((prevUrls) => {
        return { ...prevUrls, ...urls };
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, []);

  useEffect(() => {
    fetchImageList(false);
  }, [fetchImageList]);

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
        <SelectImageButton
          label="Header Image"
          name="headerImage"
          addImageSelectionInPageConfig={addImageSelectionInPageConfig}
          loading={loading}
          hasMore={hasMore}
          fetchImageList={fetchImageList}
          imageList={imageList}
          imageUrls={imageUrls}
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
        <SelectImageButton
          label="BG Image"
          name="imageLink"
          addImageSelectionInPageConfig={addImageSelectionInPageConfig}
          loading={loading}
          hasMore={hasMore}
          fetchImageList={fetchImageList}
          imageList={imageList}
          imageUrls={imageUrls}
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
          helperText={(errors && errors?.orderNumber) || ""}
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
  errors: PropTypes.object,
  addImageSelectionInPageConfig: PropTypes.func
};

export default PageConfigForm;
