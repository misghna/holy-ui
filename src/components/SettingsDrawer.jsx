import { useState, useEffect } from "react";

import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Close as CloseIcon,
  Language as LanguageIcon,
  Business as BusinessIcon,
  SettingsBrightness as SettingsBrightnessIcon
} from "@mui/icons-material";
import PaletteIcon from "@mui/icons-material/Palette";
import {
  Drawer,
  Paper,
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
  IconButton
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";
import { useTheme } from "~/contexts/ThemeProvider";
import { getSetting, setSetting } from "~/utils/settingsService";

const SettingsDrawer = ({ open, handleClose }) => {
  // const [themeMode, setThemeMode] = useState(() => getSetting("themeMode", "light"));
  const [language, setLanguage] = useState(() => getSetting("language", "english"));
  const [themeColor, setThemeColor] = useState(() => getSetting("themeColor", "#808080"));
  const [selectedTenant, setSelectedTenant] = useState(() => getSetting("selectedTenant", "1801"));
  const { setting } = useGlobalSetting();
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();

  useEffect(() => {
    if (setting.default_theme_color) {
      setThemeColor(setting.default_theme_color);
    }
  }, [setting.default_theme_color]);

  const handleThemeChange = (mode) => {
    toggleTheme(mode);
  };

  const handleColorChange = (color) => {
    setThemeColor(color);
    setSetting("themeColor", color);
    // Implement theme color change logic here
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    setSetting("language", selectedLanguage);
  };

  const handleTenantChange = (event) => {
    const selectedTenant = event.target.value;
    setSelectedTenant(selectedTenant);
    setSetting("selectedTenant", selectedTenant);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  const isAuthenticated = setting.authenticated;
  const languageList = setting.langs || [];
  const tenantList = setting.tenants || [];
  const themeColors = setting.theme_colors || []; // Get theme colors from global settings or provide default colors

  return (
    <Drawer anchor="right" open={open} onClose={handleClose} sx={{ width: "80vw" }}>
      <Paper sx={{ height: "100%", padding: "16px", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={handleClose} edge="end" color="inherit" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ flexGrow: 1 }}>
          <ListItem button sx={{ marginBottom: "8px" }}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Language" />
            <Select value={language} onChange={handleLanguageChange} size="small">
              {languageList.map((lang) => (
                <MenuItem key={lang.id} value={lang.id}>
                  {lang.name}
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
              variant={theme.palette.type === "light" ? "contained" : "outlined"}
              onClick={() => handleThemeChange("light")}
              startIcon={<Brightness7Icon />}
            >
              Light
            </Button>
            {/* <Button
              variant={theme.palette.type === "system" ? "contained" : "outlined"}
              onClick={() => {}}
              startIcon={<SettingsBrightnessIcon />}
              color="primary"
            >
              System
            </Button> */}
            <Button
              variant={theme.palette.type === "dark" ? "contained" : "outlined"}
              onClick={() => handleThemeChange("dark")}
              startIcon={<Brightness4Icon />}
              color="primary"
            >
              Dark
            </Button>
          </Box>
          <Divider />
          <ListItem sx={{ marginBottom: "8px" }}>
            <ListItemIcon>
              <PaletteIcon sx={{ color: "gray" }} />
            </ListItemIcon>
            <ListItemText primary="Theme Color" />
          </ListItem>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "8px", gap: "8px", marginLeft: "48px" }}>
            {themeColors.map((colorObj) => (
              <Button
                key={colorObj.hexCode}
                variant={themeColor === colorObj.hexCode ? "contained" : "outlined"}
                style={{ marginRight: "8px" }}
                onClick={() => handleColorChange(colorObj.hexCode)}
              >
                <Typography>{colorObj.label}</Typography>
              </Button>
            ))}
          </Box>
          <Divider />
          <ListItem sx={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Tenant" />
            <Select value={selectedTenant} onChange={handleTenantChange} size="small" sx={{ marginLeft: "auto" }}>
              {tenantList.map((tenant) => (
                <MenuItem key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </MenuItem>
              ))}
            </Select>
          </ListItem>
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

SettingsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default SettingsDrawer;
