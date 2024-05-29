import { useState, useCallback, useMemo } from "react";

import _ from "lodash";
import * as Yup from "yup";

import { axiosPrivate } from "~/_api";
import config from "~/constants/endpoints.json";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const pageConfigInitial = {
  pageType: "",
  name: "",
  headerText: "",
  imageLink: "",
  parent: "",
  description: "",
  language: "",
  headerImage: "",
  orderNumber: 0
};
const schema = Yup.object().shape({
  pageType: Yup.string().required("Page Type is required"),
  name: Yup.string().required("name is required"),
  headerText: Yup.string().required("Header text is required "),
  parent: Yup.string().required("parent is required"),
  description: Yup.string(),
  language: Yup.string().required("language is required"),
  headerImage: Yup.string(),
  orderNumber: Yup.number(),
  imageLink: Yup.string(),
  id: Yup.string()
});
const useContentManager = () => {
  const [pageConfig, setPageConfig] = useState(pageConfigInitial);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(1);
  const { setting } = useGlobalSetting();
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const { labels } = setting;
  const [pageDialogTitle, setPageDialogTitle] = useState("");

  const validateField = useCallback((name, value) => {
    schema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors((prevErrors) => {
          return {
            ...prevErrors,
            [name]: ""
          };
        });
      })
      .catch((error) => {
        setErrors((prevErrors) => {
          return {
            ...prevErrors,
            [name]: error.message
          };
        });
      });
  }, []);
  const validateObject = useCallback((formData) => {
    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((error) => {
        const formattedErrors = error.inner.reduce((acc, err) => {
          return {
            ...acc,
            [err.path]: err.message
          };
        }, {});
        setErrors(formattedErrors);
      });
  }, []);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setPageConfig((prevPageConfig) => {
        return {
          ...prevPageConfig,
          [name]: value
        };
      });
      validateField(name, value);
    },
    [validateField, setPageConfig]
  );
  const savePageConfig = useCallback(() => {
    validateObject(pageConfig)
      .then(() => {
        return axiosPrivate.post(`/api/protected/${currentConfig.pageConfig}`, pageConfig);
      })
      .then(({ data }) => {
        console.log("saved succefylly ", data);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
  }, [pageConfig, validateObject]);

  const handleTabChange = useCallback(
    (event, newValue) => {
      setActiveTab(newValue);
    },
    [setActiveTab]
  );

  const handleAddModalOpen = useCallback((title) => {
    setPageDialogTitle(title);
    setModalOpenAdd(() => true);
  }, []);
  const handleAddModalClose = useCallback(() => {
    setModalOpenAdd(false);
    setPageConfig(pageConfigInitial);
    setErrors({});
  }, [setModalOpenAdd, setPageConfig]);

  const updatePageConfig = useCallback(() => {
    validateObject(pageConfig)
      .then(() => axiosPrivate.put(`/api/protected/${currentConfig.pageConfig}`, pageConfig))
      .then(({ data }) => {
        console.log("saved succefylly ", data);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
    setPageConfig(pageConfigInitial);
  }, [validateObject, pageConfig]);
  const populatePageConfigForm = useCallback(
    (row) => {
      const { id } = row.original;
      axiosPrivate
        .get(`/api/protected/${currentConfig.pageConfig}`, {
          params: {
            id
          }
        })
        .then(({ data }) => {
          const pageConfigTemp = {
            id: data.id,
            pageType: data.page_type,
            parent: data.parent,
            headerText: data.header_text,
            language: data.language,
            imageLink: data.img_link,
            headerImage: data.header_image,
            orderNumber: data.order_number,
            description: data.description,
            name: data.name
          };
          setPageConfig((prevPageConfig) => {
            return {
              ...prevPageConfig,
              ...pageConfigTemp
            };
          });
          handleAddModalOpen("Update Page Config");
        })
        .catch((error) => {
          console.log("Error : >> ", error);
        });
    },
    [handleAddModalOpen]
  );

  const deletePageConfig = useCallback((row) => {
    const { id } = row.original;
    axiosPrivate
      .delete(`/api/protected/${currentConfig.pageConfig}}`, {
        params: {
          id
        }
      })
      .then(({ data }) => {
        console.log("data deleted :>> ", data.id);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
  }, []);
  const addImageSelectionInPageConfig = (selectionButtonName, imageList) => {
    setPageConfig((prevPageConfig) => {
      return {
        ...prevPageConfig,
        [selectionButtonName]: imageList
      };
    });
  };
  const pageConfigFormProps = useMemo(() => {
    return {
      pageConfig: _.cloneDeep(pageConfig),
      handleChange,
      addImageSelectionInPageConfig,
      errors: _.cloneDeep(errors)
    };
  }, [errors, handleChange, pageConfig]);
  const dialogFormProps = useMemo(() => {
    return {
      0: {
        dialogProps: { ...pageConfigFormProps, pageConfig: _.cloneDeep(pageConfig) },
        actionHandler: pageConfig.id ? updatePageConfig : savePageConfig,
        dialogHeader: pageDialogTitle,
        actionLabel: pageDialogTitle.startsWith("Add") ? "Add" : "Save"
      },
      1: { dialogProps: {}, actionHandler: () => {}, dialogHeader: " Add Content", actionLabel: "Add" },
      2: { dialogProps: {}, actionHandler: () => {}, dialogHeader: " Add Document", actionLabel: "Save" }
    };
  }, [pageConfigFormProps, pageConfig, updatePageConfig, savePageConfig, pageDialogTitle]);

  return {
    activeTab,
    handleTabChange,
    currentDialogFormProps: dialogFormProps[activeTab],
    labels,
    populatePageConfigForm,
    deletePageConfig,
    updatePageConfig,
    modalOpenAdd,
    handleAddModalClose,
    handleAddModalOpen,
    pageConfig
  };
};

export default useContentManager;
