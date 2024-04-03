import { useCallback } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { Box, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { string } from "prop-types";

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
        </Toolbar>
      </AppBar>
      <ChurchDrawer handleDrawerClose={handleDrawerClose} />
    </Box>
  );
}

NavigationHeader.propTypes = {
  title: string
};
