import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import ChurchDrawer from "./Drawer";
const navigationItems = [
  {
    label: "Home",
    icon: null,
    path: "/"
  },
  {
    label: "About",
    icon: null,
    path: "/about"
  }
];
export default function NavigationHeader() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Church
          </Typography>
        </Toolbar>
      </AppBar>
      <ChurchDrawer navigationItems={navigationItems} open={open} handleDrawerClose={handleDrawerClose} />
    </>
  );
}
