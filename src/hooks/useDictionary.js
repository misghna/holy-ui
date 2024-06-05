import { useState, useMemo, useCallback } from "react";

import _ from "lodash";
import * as Yup from "yup";

import { axiosPrivate } from "~/_api";
import config from "~/constants/endpoints.json";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const dictionaryInitial = {
  tenant_name: "",
  key: "",
  english: "",
  ትግርኛ: "",
  spanilla: ""
};

const schema = Yup.object().shape({
  tenant_name: Yup.string().required("Tenant's name is required"),
  key: Yup.string().required("Key is required"),
  english: Yup.string().required("English translation is required"),
  ትግርኛ: Yup.string().required("Tigrinya translation is required"),
  spanilla: Yup.string().required("Spanish translation is required")
});

const UseDictionary = () => {
  const [dictionary, setDictionary] = useState(dictionaryInitial);
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
  }, []);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setDictionary((prevDictionary) => {
        return {
          ...prevDictionary,
          [name]: value
        };
      });
      validateField(name, value);
    },
    [validateField, setDictionary]
  );

  const saveDictionary = useCallback(() => {
    validateObject(dictionary);
    axiosPrivate
      .post(`/api/protected/${currentConfig.dictionaries}`, dictionary)
      .then(({ data }) => {
        console.log("saved successfully", data);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
  }, [dictionary, validateObject]);

  const handleTabChange = useCallback((event, newValue) => {
    setActiveTab(newValue);
  }, []);

  const handleAddModalOpen = useCallback((title) => {
    setPageDialogTitle(title);
    setModalOpenAdd(true);
  }, []);

  const handleAddModalClose = useCallback(() => {
    setModalOpenAdd(false);
    setDictionary(dictionaryInitial);
  }, []);

  const updateDictionary = useCallback(() => {
    validateObject(dictionary);
    axiosPrivate
      .put(`/api/protected/${currentConfig.dictionaries}`, dictionary)
      .then(({ data }) => {
        console.log("saved successfully", data);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
    setDictionary(dictionaryInitial);
  }, [dictionary, validateObject]);

  const populateDictionaryForm = useCallback(
    (row) => {
      const { id, key, ትግርኛ, spanila } = row.original;

      const dictionaryTemp = {
        id,
        key,
        ትግርኛ,
        spanila
      };

      setDictionary((prevDictionary) => {
        return {
          ...prevDictionary,
          ...dictionaryTemp
        };
      });
      handleAddModalOpen("Update Page Config");
    },
    [handleAddModalOpen]
  );

  const deleteDictionary = useCallback((row) => {
    const { id } = row.original;
    axiosPrivate
      .delete(`/api/protected/${currentConfig.dictionaries}/${id}`)
      .then(({ data }) => {
        console.log("data deleted", data.id);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
  }, []);

  const dictConfigFormProps = useMemo(
    () => ({
      dictConfig: _.cloneDeep(dictionary),
      handleChange,
      errors: _.cloneDeep(errors)
    }),
    [errors, handleChange, dictionary]
  );

  const dialogFormProps = useMemo(
    () => ({
      dialogProps: { ...dictConfigFormProps, dictConfig: _.cloneDeep(dictionary) },
      actionHandler: dictionary.id ? updateDictionary : saveDictionary,
      dialogHeader: pageDialogTitle,
      actionLabel: pageDialogTitle.startsWith("Add") ? "Add" : "Save"
    }),
    [dictConfigFormProps, dictionary, updateDictionary, saveDictionary, pageDialogTitle]
  );

  return {
    activeTab,
    handleTabChange,
    dialogFormProps,
    labels,
    populateDictionaryForm,
    deleteDictionary,
    updateDictionary,
    modalOpenAdd,
    handleAddModalClose,
    handleAddModalOpen,
    dictionary
  };
};

export default UseDictionary;
