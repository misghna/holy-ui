import { useCallback, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { string } from "prop-types";

import SettingsDrawer from "~/components/SettingsDrawer";
import { DRAWER_WIDTH } from "~/constants/theme";
import { actionTypes, useLayout } from "~/contexts/LayoutProvider";

import ChurchDrawer from "./Drawer";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export default function NavigationHeader() {
  const { state, dispatch } = useLayout();
  const { open } = state;

  // State and function for handling the settings drawer
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleDrawerOpen = () => {
    dispatch({ type: actionTypes.TOGGLE_DRAWER });
  };
  const handleDrawerClose = useCallback(() => {
    dispatch({ type: actionTypes.UNTOGGLE_DRAWER });
  }, [dispatch]);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
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
          <IconButton size="large" edge="end" color="inherit" aria-label="settings" onClick={handleSettingsOpen}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ChurchDrawer handleDrawerClose={handleDrawerClose} />
      <SettingsDrawer open={settingsOpen} handleClose={handleSettingsClose} />
    </Box>
  );
}

NavigationHeader.propTypes = {
  title: string
};
