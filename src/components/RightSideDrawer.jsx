import React from "react";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import PaletteIcon from "@mui/icons-material/Palette";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Select, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

const RightSideDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Assuming user login state
  const [themeMode, setThemeMode] = React.useState("light"); // 'light' or 'dark'
  const [selectedColor, setSelectedColor] = React.useState("primary"); // 'primary' or 'secondary'
  const [language, setLanguage] = React.useState("English"); // Default language
  const languageList = ["English", "Spanish", "French", "German", "Italian"]; // Example language list

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const handleThemeToggle = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleLogout = () => {
    // Perform logout action
    setIsLoggedIn(false);
  };

  const renderAvatar = () => {
    if (isLoggedIn) {
      // Assuming user data is available in context
      return (
        <Avatar sx={{ bgcolor: "#3f51b5" }}>AB</Avatar> // Placeholder initials and background color
      );
    }
    return <SettingsIcon />;
  };

  return (
    <div>
      <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleToggleDrawer} sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right" // Position the drawer on the right side
        open={open}
        onClose={handleToggleDrawer}
        sx={{ width: "60vw" }} // Set the width of the drawer as 60% of the viewport width
      >
        <Box sx={{ width: "100%" }}>
          <List>
            <ListItem button onClick={handleThemeToggle}>
              <ListItemIcon>{themeMode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}</ListItemIcon>
              <ListItemText primary="Theme Mode" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PaletteIcon />
              </ListItemIcon>
              <ListItemText primary="Theme Color" />
              <Select value={selectedColor} onChange={handleColorChange}>
                <MenuItem value="primary">Primary</MenuItem>
                <MenuItem value="secondary">Secondary</MenuItem>
              </Select>
            </ListItem>
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
            <ListItem button onClick={isLoggedIn ? handleLogout : null}>
              <ListItemText primary={isLoggedIn ? "Logout" : "Login"} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box sx={{ position: "fixed", top: 10, right: 10 }}>
        <IconButton color="inherit" aria-label="settings" onClick={handleToggleDrawer}>
          {renderAvatar()}
        </IconButton>
      </Box>
    </div>
  );
};

export default RightSideDrawer;
