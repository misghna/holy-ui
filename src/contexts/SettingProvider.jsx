import PropTypes from "prop-types";

import useSetting from "~/hooks/useSetting";

import SettingContext from "./settingContext";

const url = "28912ddd5410287eb4c0";
const SettingProvider = ({ children }) => {
  const { state, dispatch } = useSetting(url);

  return state.setting.menu.length > 0 ? (
    <SettingContext.Provider value={{ state, dispatch }}>{children}</SettingContext.Provider>
  ) : null;
};
SettingProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default SettingProvider;
