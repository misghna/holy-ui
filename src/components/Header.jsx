import { useCallback } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { Box, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { bool, string } from "prop-types";

import { DRAWER_WIDTH } from "~/constants/theme";
import { actionTypes, useLayout } from "~/contexts/LayoutProvider";

import SideMenuDrawer from "./Drawer";

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

export default function NavigationHeader({ drawerAlwaysOpen = false }) {
  const { state, dispatch } = useLayout();
  const { open } = state;

  const handleDrawerOpen = () => {
    dispatch({ type: actionTypes.TOGGLE_DRAWER });
  };
  const handleDrawerClose = useCallback(() => {
    dispatch({ type: actionTypes.UNTOGGLE_DRAWER });
  }, [dispatch]);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={drawerAlwaysOpen || open}>
        <Toolbar>
          {!open && !drawerAlwaysOpen && (
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
          )}
          {!open && !drawerAlwaysOpen && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="pageTitle">
              Holy
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <SideMenuDrawer handleDrawerClose={handleDrawerClose} drawerAlwaysOpen={drawerAlwaysOpen} />
    </Box>
  );
}

NavigationHeader.propTypes = {
  title: string,
  drawerAlwaysOpen: bool
};
