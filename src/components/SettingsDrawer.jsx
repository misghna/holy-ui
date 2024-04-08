import React from "react";


import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  Typography,
  Button
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { useNavigate } from "react-router-dom";

import useSetting from "~/hooks/useSetting";

const SettingsDrawer = ({ open, handleClose }) => {
  const [themeMode, setThemeMode] = React.useState("light"); // 'light' or 'dark'
  const [language, setLanguage] = React.useState("English"); // Default language
  const languageList = ["English", "Spanish", "French", "German", "Italian"]; // Example language list

  const { state } = useSetting(); // Assuming useSetting manages local state
  const navigate = useNavigate();

  const handleThemeChange = (event) => {
    setThemeMode(event.target.value);
    // You can implement theme change logic here
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  const isAuthenticated = state.setting.authenticated;

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={handleClose} sx={{ width: "60vw" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px" }}>
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={handleClose} edge="end" color="inherit" aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <div style={{ padding: "8px 16px" }}>
          <Typography variant="subtitle1">Mode</Typography>
          <Box sx={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <Button
              variant={themeMode === "light" ? "contained" : "outlined"}
              onClick={() => handleThemeChange("light")}
              startIcon={<Brightness7Icon />}
            >
              Light
            </Button>
            <Button
              variant={themeMode === "system" ? "contained" : "outlined"}
              onClick={() => handleThemeChange("system")}
              startIcon={<SettingsBrightnessIcon />}
            >
              System
            </Button>
            <Button
              variant={themeMode === "dark" ? "contained" : "outlined"}
              onClick={() => handleThemeChange("dark")}
              startIcon={<Brightness4Icon />}
            >
              Dark
            </Button>
          </Box>
        </div>
        <Box sx={{ width: "100%" }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary="Language" />
              <Select value={language} onChange={handleLanguageChange}>
                {languageList.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </ListItem>
            <Divider />
            <div style={{ padding: "8px 16px" }}>
              {isAuthenticated ? (
                <Button onClick={handleLogout} fullWidth>
                  Logout
                </Button>
              ) : (
                <Button onClick={handleLogin} fullWidth>
                  Login
                </Button>
              )}
            </div>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

// Prop validation
SettingsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default SettingsDrawer;
