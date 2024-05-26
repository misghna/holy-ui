import React, { Fragment, useMemo, useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
  Typography
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { styled, useTheme } from "@mui/material/styles";
import { bool, func } from "prop-types";
import { useNavigate } from "react-router-dom";

import { DRAWER_WIDTH } from "~/constants/theme";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";
import { actionTypes, useLayout } from "~/contexts/LayoutProvider";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "sticky",
  top: 0,
  left: 0,
  zIndex: 10,
  width: "100%",
  padding: theme.spacing(1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  backgroundColor: "white"
}));

const StyledCustomButtons = styled(Button)({
  width: "100%",
  height: 30,
  margin: "0 auto",
  zIndex: 15,
  background: "white",
  color: "black",
  border: "1px solid black"
});

const SideMenuDrawer = React.memo(function SideMenuDrawer({ handleDrawerClose, drawerAlwaysOpen }) {
  const { state: drawerState, dispatch } = useLayout();
  const { open } = drawerState;
  const theme = useTheme();
  const { setting } = useGlobalSetting();
  const navigate = useNavigate();
  const menu = useMemo(() => setting?.menu || [], [setting?.menu]);
  const isAuthenticated = setting.authenticated;

  const groupedMenu = useMemo(
    () =>
      menu.reduce((acc, item) => {
        acc[item.type] = acc[item.type] || [];
        acc[item.type].push(item);
        return acc;
      }, {}),
    [menu]
  );

  const submenus = useMemo(() => {
    const rows = Object.keys(groupedMenu).length;
    const columns = Object.values(groupedMenu).reduce((max, group) => Math.max(max, group.length), 0);
    const nestedArray = Array.from({ length: rows }, () => Array.from({ length: columns }, () => false));
    return nestedArray;
  }, [groupedMenu]);

  const [isSubMenOpen, setIsSubMenOpen] = useState([...submenus]);

  const renderSubMenu = (submenu, typeIndex, menuIndex) => {
    if (submenu?.length === 0 || isSubMenOpen.length === 0) return null;

    return (
      <Collapse in={isSubMenOpen[typeIndex][menuIndex]} timeout="auto" unmountOnExit>
        <List disablePadding>
          {submenu.map((item) => (
            <ListItemButton key={item.name} onClick={() => navigate(item.url, { replace: true })}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
      </Collapse>
    );
  };

  const showMoreOrLessIcon = (submenu, typeIndex, menuIndex) => {
    if (submenu.length === 0) return null;

    return isSubMenOpen.length > 0 && isSubMenOpen[typeIndex][menuIndex] ? (
      <ExpandLessIcon onClick={() => handleSubMenCloseClick(typeIndex, menuIndex)} />
    ) : (
      <ExpandMoreIcon onClick={() => handleSubMenOpenClick(typeIndex, menuIndex)} />
    );
  };

  const handleSubMenOpenClick = (typeIndex, menuIndex) => {
    const arr = [...submenus];
    arr[typeIndex] = arr[typeIndex].map(() => false);
    arr[typeIndex][menuIndex] = true;
    setIsSubMenOpen(arr);
  };

  const handleSubMenCloseClick = (typeIndex, menuIndex) => {
    const arr = [...submenus];
    arr[typeIndex][menuIndex] = false;
    setIsSubMenOpen(arr);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <SwipeableDrawer
      onOpen={() => {}}
      onClose={() => {
        dispatch({ type: actionTypes.UNTOGGLE_DRAWER });
      }}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        position: "relative",
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          maxHeight: "100dvh",
          overflow: "auto"
        }
      }}
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box
          sx={{ width: "100%", backgroundColor: "white", display: "flex", justifyContent: "center" }}
          display="flex"
          alignItems="center"
        >
          <Typography variant="h6" textAlign="center" noWrap flexGrow={1}>
            Holy-UI
          </Typography>
          {!drawerAlwaysOpen && (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          )}
        </Box>
      </DrawerHeader>

      {/* Added container with fixed height and overflow */}
      <Box style={{ overflow: "auto", maxHeight: "calc(100vh - 64px)" }}>
        <List style={{ padding: "2px 0" }}>
          {groupedMenu &&
            Object.entries(groupedMenu).map(([type, items], typeIndex) => (
              <Fragment key={type}>
                <ListSubheader sx={{ fontWeight: "bold" }}>{type === "public" ? "Public" : "Secure"}</ListSubheader>
                <Divider sx={{ marginBottom: 1 }} />
                {items.map((item, menuIndex) => (
                  <Fragment key={item.name}>
                    <ListItem
                      button
                      dense
                      onClick={() => {
                        if (item.sub_menu.length > 0 && !isSubMenOpen[typeIndex][menuIndex]) {
                          handleSubMenOpenClick(typeIndex, menuIndex);
                        }
                        if (item.sub_menu.length === 0) {
                          navigate(item.url);
                        }
                      }}
                      sx={{ py: 1 }} // Adjusted vertical padding
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                      {item.sub_menu && showMoreOrLessIcon(item.sub_menu, typeIndex, menuIndex)}
                    </ListItem>
                    {item.sub_menu && renderSubMenu(item.sub_menu, typeIndex, menuIndex)}
                  </Fragment>
                ))}
              </Fragment>
            ))}
          {!isAuthenticated ? (
            <StyledCustomButtons onClick={() => handleNavigation("/login")} color="primary">
              Login
            </StyledCustomButtons>
          ) : (
            <StyledCustomButtons onClick={() => handleNavigation("/logout")} color="primary">
              Logout
            </StyledCustomButtons>
          )}
        </List>
      </Box>
    </SwipeableDrawer>
  );
});

SideMenuDrawer.propTypes = {
  handleDrawerClose: func.isRequired,
  drawerAlwaysOpen: bool
};

export default SideMenuDrawer;
