import { createContext, useCallback, useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";

import useAxiosPrivate from "~/hooks/useAxiosPrivate";

import config from "../constants/endpoints.json";

const GlobalSettingContext = createContext({ state: {}, dispatch: () => {} });
const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const initialState = {
  menu: [],
  authenticated: true,
  avatar: "",
  default_theme_color: "",
  langs: [],
  product_release_no: "",
  user_name: ""
};
export const GlobalSettingProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate();
  const [setting, setSetting] = useState(initialState);

  const fetchSetting = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(`/api/${currentConfig.globalSetting}`);
      setSetting((prev) => {
        return { ...prev, ...response.data };
      });
    } catch (error) {
      console.error("Error fetching menu data", error);
    }
  }, [axiosPrivate, setSetting]);
  useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);
  if (setting.menu.length === 0) return null;

  return <GlobalSettingContext.Provider value={{ setting }}>{children}</GlobalSettingContext.Provider>;
};
export const useGlobalSetting = () => useContext(GlobalSettingContext);
GlobalSettingProvider.propTypes = {
  children: PropTypes.node.isRequired
};
