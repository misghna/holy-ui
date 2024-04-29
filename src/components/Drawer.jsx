import React, { Fragment, useMemo, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Divider,
  ListItemButton,
  Button,
  Box,
  Typography,
  IconButton,
  ListSubheader
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { styled, useTheme } from "@mui/material/styles";
import { bool, func } from "prop-types";
import { useNavigate } from "react-router-dom";

import { DRAWER_WIDTH } from "~/constants/theme";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";
import { useLayout } from "~/contexts/LayoutProvider";
import Login from "~/pages/Login";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "sticky",
  top: 0,
  left: 0,
  zIndex: 10,
  width: "100%",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  backgroundColor: "white"
}));

const SideMenuDrawer = React.memo(function SideMenuDrawer({ handleDrawerClose, drawerAlwaysOpen }) {
  const { state: drawerState } = useLayout();
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
    if (submenu?.length == 0 || isSubMenOpen.length === 0) return null;
    return (
      <Collapse in={isSubMenOpen[typeIndex][menuIndex]} timeout="auto" unmountOnExit>
        <List disablePadding>
          {submenu &&
            submenu.map((item) => (
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
    if (isSubMenOpen.length > 0 && isSubMenOpen[typeIndex][menuIndex])
      return <ExpandLessIcon onClick={() => handleSubMenCloseClick(typeIndex, menuIndex)} />;
    return <ExpandMoreIcon onClick={() => handleSubMenOpenClick(typeIndex, menuIndex)} />;
  };

  const handleSubMenOpenClick = (typeIndex, menuIndex) => {
    const arr = [...submenus];
    let typeOpens = arr[typeIndex];
    typeOpens = typeOpens.map(() => false);
    typeOpens[menuIndex] = true;
    arr[typeIndex] = [...typeOpens];
    setIsSubMenOpen(arr);
  };

  const handleSubMenCloseClick = (typeIndex, menuIndex) => {
    const arr = [...submenus];
    let typeOpens = arr[typeIndex];
    typeOpens[menuIndex] = false;
    arr[typeIndex] = [...typeOpens];
    setIsSubMenOpen(arr);
  };

  const StyledButton = styled(Button)({
    marginTop: "16px"
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <SwipeableDrawer
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
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box sx={{ width: "100%", backgroundColor: "white" }} display="flex" alignItems="center">
          <Typography variant="h6" textAlign="center" noWrap flexGrow={1} sx={{ width: "100%" }}>
            Holy-UI
          </Typography>
          {!drawerAlwaysOpen && (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          )}
        </Box>
      </DrawerHeader>
      <List style={{ marginBottom: "64px" }}>
        {groupedMenu &&
          Object.entries(groupedMenu).map((items, typeIndex) => (
            <Fragment key={items?.at(0)}>
              <ListSubheader>{items?.at(0) === "public" ? "Public" : "Secure"}</ListSubheader>
              <Divider />
              {items?.at(1)?.map((item, menuIndex) => (
                <>
                  <ListItem
                    key={item.name}
                    button
                    onClick={() => {
                      if (item.sub_menu.length > 0 && !isSubMenOpen[typeIndex][menuIndex]) {
                        handleSubMenOpenClick(typeIndex, menuIndex);
                      }
                      if (item.sub_menu.length == 0) {
                        navigate(item.url);
                      }
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                    {item.sub_menu && showMoreOrLessIcon(item.sub_menu, typeIndex, menuIndex)}
                  </ListItem>
                  {item.sub_menu && renderSubMenu(item.sub_menu, typeIndex, menuIndex)}
                </>
              ))}
            </Fragment>
          ))}
      </List>
      <Divider className="home" style={{ paddingTop: "10px" }} />

      <Button
        onClick={() => handleNavigation(!isAuthenticated ? "/login" : "")}
        variant="contained"
        color="primary"
        style={{
          position: "fixed",
          bottom: 0,
          width: 225,
          zIndex: 999,
          background: "white",
          color: "black",
          border: "1px solid black"
        }}
      >
        {!isAuthenticated ? "Login" : "lOgin"}
      </Button>
    </SwipeableDrawer>
  );
});

SideMenuDrawer.propTypes = {
  handleDrawerClose: func.isRequired,
  drawerAlwaysOpen: bool
};

export default SideMenuDrawer;
