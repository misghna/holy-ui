import { createContext, useContext } from "react";

import PropTypes from "prop-types";

import useSetting from "~/hooks/useSetting";

import config from "../constants/endpoints.json";

const GlobalSettingContext = createContext({ state: {}, dispatch: () => {} });
const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

export const GlobalSettingProvider = ({ children }) => {
  const { state, dispatch } = useSetting(currentConfig.globalSetting);

  return !state.loading ? (
    <GlobalSettingContext.Provider value={{ state, dispatch }}>{children}</GlobalSettingContext.Provider>
  ) : null;
};
export const useGlobalSetting = () => useContext(GlobalSettingContext);
GlobalSettingProvider.propTypes = {
  children: PropTypes.node.isRequired
};
