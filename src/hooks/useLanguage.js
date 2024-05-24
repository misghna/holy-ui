import { useState, useMemo, useCallback } from "react";

import _ from "lodash";

import * as Yup from "yup";
import config from "~/constants/endpoints.json";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const langConfigInitial = {
  lang_id: "",
  lang_name: "",
  tenant_id: ""
};
const schema = Yup.object().shape({
  lang_id: Yup.string().required("lang Id is required"),
  lang_name: Yup.string().required("Lang Name is required"),
  tenant_id: Yup.string().required("tenant Id text is required ")
});

const useLanguage = () => {
  const [langConfig, setLangConfig] = useState(langConfigInitial);
  const [errors, setErrors] = useState({});
  const [pageDialogTitle, setPageDialogTitle] = useState("");
  const [modalOpenAdd, setModalOpenAdd] = useState(false);

  const validateField = useCallback(
    (name, value) => {
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
    },
    [schema]
  );
  const validateObject = useCallback(
    (formData) => {
      schema
        .validate(formData)
        .then(() => {
          setErrors({});
        })
        .catch((error) => {
          setErrors((prevErrors) => {
            return {
              ...prevErrors,
              ...error
            };
          });
        });
    },
    [schema]
  );

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setLangConfig((prevState) => {
        return {
          ...prevState,
          [name]: value
        };
      });
      validateField(name, value);
    },
    [validateField, setLangConfig]
  );

  const populateLanguageForm = (row) => {
    const { lang_id, lang_name, tenant_id } = row.original;
    setLangConfig((prevState) => {
      return {
        ...prevState,
        lang_id,
        lang_name,
        tenant_id
      };
    });
  };

  const deleteLangConfig = useCallback((row) => {
    const { id } = row.original;
    axiosPrivate
      .delete(`/api/protected/${currentConfig.lang}/${id}`)
      .then(({ data }) => {
        console.log("data deleted  ", data.id);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
  }, []);

  const handleAddModalOpen = useCallback((title) => {
    setPageDialogTitle(title);
    setModalOpenAdd(() => true);
  }, []);
  const handleAddModalClose = useCallback(() => {
    setModalOpenAdd(false);
    setLangConfig(langConfigInitial);
  }, [setModalOpenAdd, setLangConfig]);

  const saveLangeConfig = useCallback(() => {
    validateObject(langConfig);
    axiosPrivate
      .post(`/api/protected/${currentConfig.pageConfig}`, langConfig)
      .then(({ data }) => {
        console.log("saved succefylly ", data);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
  }, [langConfig, validateObject]);

  const updateLangConfig = useCallback(() => {
    validateObject(langConfig);
    axiosPrivate
      .put(`/api/protected/${currentConfig.pageConfig}`, langConfig)
      .then(({ data }) => {
        console.log("saved succefylly ", data);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
    setLangConfig(langConfigInitial);
  }, [validateObject, langConfig]);

  const langConfigFormProps = useMemo(() => {
    return { langConfig: _.cloneDeep(langConfig), handleChange, errors: _.cloneDeep(errors) };
  }, [errors, handleChange, langConfig]);
  const dialogFormProps = useMemo(() => {
    return {
      dialogProps: { ...langConfigFormProps, pageConfig: _.cloneDeep(langConfig) },
      actionHandler: langConfig.id ? updateLangConfig : saveLangeConfig,
      dialogHeader: pageDialogTitle,
      actionLabel: pageDialogTitle.startsWith("Add") ? "Add" : "Save"
    };
  }, [langConfigFormProps, langConfig, updateLangConfig, saveLangeConfig, pageDialogTitle]);

  return {
    populateLanguageForm,
    deleteLangConfig,
    modalOpenAdd,
    dialogFormProps,
    handleAddModalClose,
    handleAddModalOpen
  };
};
export default useLanguage;
