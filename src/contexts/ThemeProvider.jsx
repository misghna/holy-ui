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
      const personalSettingInStorage = getSetting("personalSetting");
      const newTheme = {
        palette: {
          ...theme.palette,
          mode: themeValue,
          type: themeValue,
          primary: {
            ...theme.palette.primary,
            main: personalSettingInStorage.themeColor
          }
        }
      };
      setThemeSetting((prevTheme) => {
        return { ...prevTheme, ...newTheme };
      });
    },
    [setThemeSetting]
  );
  const changeThemeColor = useCallback(
    (colorCode) => {
      const personalSettingInStorage = getSetting("personalSetting");
      const newTheme = {
        palette: {
          ...theme.palette,
          mode: personalSettingInStorage.themeMode,
          type: personalSettingInStorage.themeMode,
          primary: {
            ...theme.palette.primary,
            main: colorCode
          }
        }
      };
      setThemeSetting((prevTheme) => {
        return { ...prevTheme, ...newTheme };
      });
    },
    [setThemeSetting]
  );

  useEffect(() => {
    const personalSettingInStorage = getSetting("personalSetting");
    if (personalSettingInStorage && personalSettingInStorage?.themeMode) {
      toggleTheme(personalSettingInStorage.themeMode);
    }
  }, [toggleTheme]);
  useEffect(() => {
    const personalSettingInStorage = getSetting("personalSetting");
    if (personalSettingInStorage && personalSettingInStorage?.themeColor) {
      changeThemeColor(personalSettingInStorage.themeColor);
    }
  }, [changeThemeColor]);

  const muiTheme = createTheme(themeSetting);
  return (
    <ThemeContext.Provider value={{ toggleTheme, changeThemeColor, theme: muiTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
HolyThemeProvider.propTypes = {
  children: node.isRequired
};

export default HolyThemeProvider;
