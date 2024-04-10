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
  Button,
  Paper,
  Drawer,
  IconButton
} from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { useNavigate } from "react-router-dom";

import useSetting from "~/hooks/useSetting";

const SettingsDrawer = ({ open, handleClose }) => {
  const [themeMode, setThemeMode] = React.useState("light"); // 'light' or 'dark'
  const [language, setLanguage] = React.useState("English"); // Default language

  const { state } = useSetting(); // Assuming useSetting manages local state
  const navigate = useNavigate();

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
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
  const languageList = state.setting.langs || [];

  return (
    <Drawer anchor="right" open={open} onClose={handleClose} sx={{ width: "80vw" }}>
      <Paper sx={{ height: "100%", padding: "16px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={handleClose} edge="end" color="inherit" aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <List sx={{ flexGrow: 1 }}>
          <ListItem button sx={{ marginBottom: "8px" }}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Language" />
            <Select value={language} onChange={handleLanguageChange} size="small">
              {languageList.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </ListItem>
          <Divider />
          <ListItem button sx={{ marginBottom: "8px" }}>
            <ListItemIcon>
              <SettingsBrightnessIcon />
            </ListItemIcon>
            <ListItemText primary="Theme Mode" />
          </ListItem>
          <Box sx={{ display: "flex", gap: "8px", marginTop: "8px", marginLeft: "48px" }}>
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
        </List>
        <Divider />
        <div style={{ marginTop: "16px" }}>
          {isAuthenticated ? (
            <Button onClick={handleLogout} fullWidth variant="contained" color="primary">
              Logout
            </Button>
          ) : (
            <Button onClick={handleLogin} fullWidth variant="contained" color="primary">
              Login
            </Button>
          )}
        </div>
      </Paper>
    </Drawer>
  );
};

// Prop validation
SettingsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default SettingsDrawer;
