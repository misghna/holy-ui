import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Box, CircularProgress } from "@mui/material";
import * as Yup from "yup";

import { axiosPrivate } from "~/_api";
import EnhancedTable from "~/components/table/EnhancedTable";
import config from "~/constants/endpoints.json";
import AddPageConfig from "~/pages/AddPageConfig";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const COLUMNS = [
  {
    Header: "Page Type",
    accessor: "page_type"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Description",
    accessor: "description"
  },
  {
    Header: "Image Link",
    accessor: "img_link"
  },
  {
    Header: "Language",
    accessor: "language"
  },
  {
    Header: "Parent",
    accessor: "parent"
  },
  {
    Header: "Header Image",
    accessor: "header_img"
  },
  {
    Header: "Header Text",
    accessor: "header_text"
  },
  {
    Header: "Updated By",
    accessor: "updated_by"
  },

  {
    Header: "Created At",
    accessor: "created_at",

    type: "date"
  },

  {
    Header: "Updated At",
    accessor: "updated_at",

    type: "date"
  },
  {
    Header: "Action",
    accessor: "action"
  }
];

const pageConfigInitial = {
  pageType: "",
  name: "",
  headerText: "",
  imageLink: "",
  parent: "",
  description: "",
  language: ""
};
const PageConfig = () => {
  const [data, setData] = React.useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageConfig, setPageConfig] = useState(pageConfigInitial);
  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    pageType: Yup.string().required("Page Type is required"),
    name: Yup.string().required("name is required"),
    headerText: Yup.string().required("Header text is required "),
    parent: Yup.string().required("parent is required"),
    description: Yup.string(),
    language: Yup.string().required("language is required")
  });

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
  const fetchData = useCallback((start, limit) => {
    axiosPrivate
      .get(`/api/protected/${currentConfig.pageConfig}?`, {
        params: {
          start,
          limit
        }
      })
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error :>> ", err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetchData(0, 100);
  }, [fetchData]);

  const savePageConfig = useCallback(() => {
    validateField(pageConfig, { abortEarly: false });
    axiosPrivate
      .post(`/api/protected/${currentConfig.pageConfig}`, pageConfig)
      .then(({ data }) => {
        console.log("saved succefylly ", data);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
  }, [pageConfig, validateField]);
  const updatePageConfig = useCallback(() => {
    validateField(pageConfig, { abortEarly: false });
    axiosPrivate
      .put(`/api/protected/${currentConfig.pageConfig}`, pageConfig)
      .then(({ data }) => {
        console.log("saved succefylly ", data);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
    setPageConfig(pageConfigInitial);
  }, [validateField, pageConfig]);
  const populatePageConfigForm = useCallback((row) => {
    const { id, name, page_type, parent, language, header_text, img_link, description } = row.original;
    const pageConfigTemp = {
      id: id,
      pageType: page_type,
      parent: parent,
      headerText: header_text,
      language: language,
      imageLink: img_link,
      description,
      name
    };
    setPageConfig((prevPageConfig) => {
      return {
        ...prevPageConfig,
        ...pageConfigTemp
      };
    });
  }, []);
  const deletePageConfig = useCallback((row) => {
    console.log(row);
  }, []);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };
  const currentAction = useMemo(
    () => (pageConfig.id ? updatePageConfig : savePageConfig),
    [pageConfig, updatePageConfig, savePageConfig]
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "calc(100dvh - 7.25rem)",
          width: "100%",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <EnhancedTable
        columns={COLUMNS}
        data={data}
        fetchData={fetchData}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        formDialog={<AddPageConfig pageConfig={pageConfig} handleChange={handleChange} errors={errors} />}
        formAction={currentAction}
        deleteAction={deletePageConfig}
        shouldVisibleToolbar={true}
        populateForm={populatePageConfigForm}
        pageConfig={pageConfig}
        handleChange={handleChange}
      />
    </div>
  );
};

export default PageConfig;
