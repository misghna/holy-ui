import { useState, useCallback, useMemo } from "react";

import * as Yup from "yup";

import { axiosPrivate } from "~/_api";
import config from "~/constants/endpoints.json";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const pageConfigInitial = {
  name: "",
  email: "",
  phone_number: "",
  access: [],
  orderNumber: 0
};

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required "),
  phone_number: Yup.string().required("Phone number is required"),
  accessListChanged: Yup.object().shape({
    finance: Yup.string(),
    admin_settings: Yup.string(),
    content_manager: Yup.string()
  }),
  id: Yup.string()
});
const useUserAccessConfig = () => {
  const [formData, setFormData] = useState(pageConfigInitial);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(0);
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
      .validate(formData)
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
      setFormData((prevPageConfig) => {
        return {
          ...prevPageConfig,
          [name]: value
        };
      });
      validateField(name, value);
    },
    [validateField, setFormData]
  );
  const saveAccessConfig = useCallback(() => {
    validateObject(formData);
    validateObject(formData)
      .then(() => {
        return axiosPrivate.post(`/api/protected/${currentConfig.userProfileAccessConfig}`, formData);
      })
      .then(({ data }) => {
        console.log("saved successfully ", data);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
  }, [formData, validateObject]);
  const handleTabChange = useCallback(
    (event, newValue) => {
      console.log("🚀 ~ useUserAccessConfig ~ newValue:", newValue);
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
    setFormData(pageConfigInitial);
  }, [setModalOpenAdd, setFormData]);

  const updateAccessConfig = useCallback(() => {
    validateObject(formData)
      .then(() => {
        const { access, accessListChanged = {}, ...formattedData } = formData;
        const accessListPrevious = {};
        // Formatting access array
        access.map((prevAccessConfig) => {
          Object.entries(prevAccessConfig).forEach(([key, value]) => {
            accessListPrevious[key] = value;
          });
        });
        // Formatting access array
        formattedData.access = Object.entries({ ...accessListPrevious, ...accessListChanged }).map(([key, value]) => {
          return { [key]: value };
        });

        return axiosPrivate.put(`/api/protected/${currentConfig.userProfileAccessConfig}`, formattedData);
      })
      .then(({ data }) => {
        console.log("saved successfully ", data);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
    // setFormData(pageConfigInitial);
  }, [validateObject, formData]);

  const populateAccessConfigForm = useCallback(
    (row) => {
      axiosPrivate
        .get(`/api/protected/${currentConfig.userProfileAccessConfig}/edit`, {
          params: {
            id: row.original.id
          }
        })
        .then(({ data }) => {
          console.log("{data} :>> ", { data });
          setFormData(data);
          handleAddModalOpen("Update Page Config");
        })
        .catch((err) => {
          console.log("{err} :>> ", { err });
        });
    },
    [handleAddModalOpen]
  );

  const deleteAccessConfig = useCallback((row) => {
    const { id } = row.original;
    axiosPrivate
      .delete(`/api/protected/${currentConfig.userProfileAccessConfig}/${id}`)
      .then(({ data }) => {
        console.log("data deleted  ", data.id);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
  }, []);

  const pageConfigFormProps = useMemo(() => {
    return { formData, handleChange, errors };
  }, [errors, handleChange, formData]);

  const dialogFormProps = useMemo(() => {
    return {
      0: {
        dialogProps: { ...pageConfigFormProps },
        actionHandler: formData.id ? updateAccessConfig : saveAccessConfig,
        dialogHeader: pageDialogTitle,
        actionLabel: pageDialogTitle.startsWith("Add") ? "Add" : "Save"
      },
      1: { dialogProps: {}, actionHandler: () => {}, dialogHeader: " Add Content", actionLabel: "Add" },
      2: { dialogProps: {}, actionHandler: () => {}, dialogHeader: " Add Document", actionLabel: "Save" }
    };
  }, [pageConfigFormProps, formData, updateAccessConfig, saveAccessConfig, pageDialogTitle]);
  return {
    activeTab,
    handleTabChange,
    currentDialogFormProps: dialogFormProps[activeTab],
    labels,
    populateAccessConfigForm,
    deleteAccessConfig,
    updateAccessConfig,
    modalOpenAdd,
    handleAddModalClose,
    handleAddModalOpen,
    formData
  };
};

export default useUserAccessConfig;
