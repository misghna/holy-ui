import { createContext, useContext } from "react";

import PropTypes from "prop-types";

import useSetting from "~/hooks/useSetting";

import config from "../constants/endpoints.json";

const SettingContext = createContext({ state: {}, dispatch: () => {} });
const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

export const SettingProvider = ({ children }) => {
  const { state, dispatch } = useSetting(currentConfig.setting);

  return !state.loading ? (
    <SettingContext.Provider value={{ state, dispatch }}>{children}</SettingContext.Provider>
  ) : null;
};
export const useSettingContext = () => useContext(SettingContext);
SettingProvider.propTypes = {
  children: PropTypes.node.isRequired
};
