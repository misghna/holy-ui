import { createContext, useState, useContext, useEffect, useCallback } from "react";

import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { node } from "prop-types";

import { theme } from "~/constants/theme";
import { getSetting } from "~/utils/settingsService";

const ThemeContext = createContext();

const HolyThemeProvider = ({ children }) => {
  const [themeSetting, setThemeSetting] = useState(theme);

  const toggleTheme = useCallback(
    (themeValue) => {
      const newTheme = {
        palette: {
          ...themeSetting.palette,
          mode: themeValue,
          type: themeValue
        }
      };
      setThemeSetting((prevTheme) => {
        return { ...prevTheme, ...newTheme };
      });
    },
    [themeSetting.palette, setThemeSetting]
  );
  useEffect(() => {
    const personalSettingInStorage = getSetting("personalSetting");
    if (personalSettingInStorage) {
      toggleTheme(personalSettingInStorage.themeMode);
    }
  }, [toggleTheme]);
  const muiTheme = createTheme(themeSetting);
  return (
    <ThemeContext.Provider value={{ toggleTheme, theme: muiTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
HolyThemeProvider.propTypes = {
  children: node.isRequired
};

export default HolyThemeProvider;
