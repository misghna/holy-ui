import { createContext, useState, useContext } from "react";

import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { node } from "prop-types";

import { theme } from "~/constants/theme";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [themeSetting, setThemeSetting] = useState({ ...theme });
  console.log("themee", themeSetting);
  const toggleTheme = (themeValue) => {
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
  };
  const muiTheme = createTheme(themeSetting);
  return (
    <ThemeContext.Provider value={{ toggleTheme, theme: muiTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
ThemeProvider.propTypes = {
  children: node.isRequired
};

export default ThemeProvider;
