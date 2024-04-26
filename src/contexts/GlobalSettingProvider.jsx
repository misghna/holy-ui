import { createContext, useCallback, useContext, useEffect, useReducer } from "react";

import PropTypes from "prop-types";

import { axiosPrivate } from "~/_api";
import { getSetting, setSetting } from "~/utils/settingsService";

import config from "../constants/endpoints.json";

const GlobalSettingContext = createContext({ state: {}, dispatch: () => {} });
const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const initialState = {
  setting: {
    menu: [],
    authenticated: true,
    avatar: "",
    default_theme_color: "",
    langs: [],
    product_release_no: "",
    user_name: "",
    theme_colors: [],
    tenants: []
  },
  personalSetting: {}
};
export const actionTypes = {
  FETCH_SETTING: "FETCH_SETTING",
  UPDATE_PERSONAL_SETTING: "UPDATE_PERSONAL_SETTING"
};
const reducer = (state, action) => {
  let personalSettingStorage = {};
  const { langs, theme_colors, tenants } = action.payload;
  const personal = {};
  let newPersonalSetting = {};
  switch (action.type) {
    case actionTypes.FETCH_SETTING:
      personalSettingStorage = getSetting("personalSetting");
      if (personalSettingStorage) {
        return { ...state, setting: action.payload, personalSetting: personalSettingStorage };
      }

      personal.language = langs[0].id;
      personal.themeColor = theme_colors[0].hexCode;
      personal.selectedTenant = tenants[0].id;
      personal.themeMode = "light";
      setSetting("personalSetting", personal);
      return { ...state, setting: action.payload, personalSetting: personal };
    case actionTypes.UPDATE_PERSONAL_SETTING:
      newPersonalSetting = { ...state.personalSetting, ...action.payload };
      setSetting("personalSetting", newPersonalSetting);
      return { ...state, personalSetting: newPersonalSetting };
    default:
      return state;
  }
};
export const GlobalSettingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setting, personalSetting } = state;

  const fetchSetting = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(`/api/${currentConfig.globalSetting}`);
      dispatch({ type: actionTypes.FETCH_SETTING, payload: response.data });
    } catch (error) {
      console.error("Error fetching menu data", error);
    }
  }, [dispatch]);
  useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);

  if (setting.menu.length === 0) return null;

  return (
    <GlobalSettingContext.Provider value={{ setting, personalSetting, dispatch }}>
      {children}
    </GlobalSettingContext.Provider>
  );
};
export const useGlobalSetting = () => useContext(GlobalSettingContext);
GlobalSettingProvider.propTypes = {
  children: PropTypes.node.isRequired
};
