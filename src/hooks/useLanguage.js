import { useState, useMemo, useCallback } from "react";

import _ from "lodash";
import * as Yup from "yup";

import { axiosPrivate } from "~/_api/index"; // Make sure the path is correct
import config from "~/constants/endpoints.json";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const langConfigInitial = {
  lang_id: "",
  lang_name: "",
  tenant_id: ""
};

const schema = Yup.object().shape({
  lang_name: Yup.string().required("Lang Name is required"),
  tenant_id: Yup.string().required("Tenant ID is required")
});

const useLanguage = () => {
  const [langConfig, setLangConfig] = useState(langConfigInitial);
  const [errors, setErrors] = useState({});
  const [pageDialogTitle, setPageDialogTitle] = useState("");
  const [modalOpenAdd, setModalOpenAdd] = useState(false);

  const validateField = useCallback((name, value) => {
    schema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: ""
        }));
      })
      .catch((error) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message
        }));
      });
  }, []);

  const validateObject = useCallback((formData) => {
    return new Promise((resolve, reject) => {
      schema
        .validate(formData, { abortEarly: false })
        .then(() => {
          console.log("Info: Validation succeeded.");
          setErrors({});
          resolve();
        })
        .catch((error) => {
          console.log("Error: Validation failed.");
          const formattedErrors = error.inner.reduce(
            (acc, err) => ({
              ...acc,
              [err.path]: err.message
            }),
            {}
          );
          setErrors(formattedErrors);
          reject(formattedErrors);
        });
    });
  }, []);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setLangConfig((prevState) => ({
        ...prevState,
        [name]: value
      }));
      validateField(name, value);
    },
    [validateField]
  );

  const handleAddModalOpen = useCallback((title) => {
    setPageDialogTitle(title);
    setModalOpenAdd(true);
  }, []);

  const handleAddModalClose = useCallback(() => {
    setModalOpenAdd(false);
    setLangConfig(langConfigInitial);
  }, []);

  const populatePageConfigForm = useCallback(
    (row) => {
      const { id } = row.original;

      axiosPrivate
        .get(`/api/protected/${currentConfig.languages}`, { params: { id } })
        .then(({ data }) => {
          const { lang_id, lang_name, tenant_id } = data;
          setLangConfig((prevPageConfig) => ({
            ...prevPageConfig,
            lang_id,
            lang_name,
            tenant_id
          }));

          handleAddModalOpen("Update Page Config");
        })
        .catch((error) => {
          console.log("Error: >> ", error);
        });
    },
    [handleAddModalOpen]
  );

  const deleteLangConfig = useCallback((row) => {
    const { id } = row.original;
    axiosPrivate
      .delete(`/api/protected/${currentConfig.languages}/${id}`)
      .then(({ data }) => {
        console.log("Data deleted: ", data.id);
      })
      .catch((err) => {
        console.error("Error: >> ", err);
      });
  }, []);

  const saveLangConfig = useCallback(() => {
    validateObject(langConfig)
      .then(() => {
        return axiosPrivate.post(`/api/protected/${currentConfig.languages}`, langConfig);
      })
      .then(({ data }) => {
        console.log("Saved successfully: ", data);
      })
      .catch((err) => {
        console.error("Error: >> ", err);
      });
  }, [validateObject, langConfig]);

  const updateLangConfig = useCallback(() => {
    validateObject(langConfig)
      .then(() => {
        return axiosPrivate.put(`/api/protected/${currentConfig.languages}`, langConfig);
      })
      .then(({ data }) => {
        console.log("Saved successfully: ", data);
      })
      .catch((err) => {
        console.error("Error: >> ", err);
      });
    setLangConfig(langConfigInitial);
  }, [validateObject, langConfig]);

  const langConfigFormProps = useMemo(
    () => ({
      langConfig: _.cloneDeep(langConfig),
      handleChange,
      errors: _.cloneDeep(errors)
    }),
    [errors, handleChange, langConfig]
  );

  const dialogFormProps = useMemo(
    () => ({
      dialogProps: { ...langConfigFormProps, pageConfig: _.cloneDeep(langConfig) },
      actionHandler: langConfig.id ? updateLangConfig : saveLangConfig,
      dialogHeader: pageDialogTitle,
      actionLabel: pageDialogTitle.startsWith("Add") ? "Add" : "Save"
    }),
    [langConfigFormProps, langConfig, updateLangConfig, saveLangConfig, pageDialogTitle]
  );

  return {
    populatePageConfigForm,
    deleteLangConfig,
    modalOpenAdd,
    dialogFormProps,
    handleAddModalClose,
    handleAddModalOpen
  };
};

export default useLanguage;
