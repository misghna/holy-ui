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
  Drawer,
  Divider,
  ListItemButton,
  Box,
  Typography
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ListSubheader from "@mui/material/ListSubheader";
import { styled, useTheme } from "@mui/material/styles";
import { bool, func } from "prop-types";
import { useNavigate } from "react-router-dom";

import { DRAWER_WIDTH } from "~/constants/theme";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";
import { useLayout } from "~/contexts/LayoutProvider";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "sticky",
  top: 0,
  left: 0,
  zIndex: 10,
  width: "100%",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  borderBottom: `1px solid ${theme.palette.primary.main}`
}));

const ChurchDrawer = React.memo(function ChurchDrawer({ handleDrawerClose, drawerAlwaysOpen }) {
  const { state: drawerState } = useLayout();

  const { open } = drawerState;

  const theme = useTheme();
  const { state } = useGlobalSetting();
  const navigate = useNavigate();
  const { setting } = state;
  const menu = setting?.menu;

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
    if (submenu?.length == 0) return null;
    return (
      <Collapse in={isSubMenOpen[typeIndex][menuIndex]} timeout="auto" unmountOnExit>
        <List disablePadding>
          {submenu &&
            submenu.map((item) => (
              <ListItemButton
                key={item.name}
                onClick={() => {
                  navigate(item.url, { replace: true });
                }}
              >
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
    if (isSubMenOpen[typeIndex][menuIndex])
      return (
        <ExpandLessIcon
          onClick={() => {
            handleSubMenCloseClick(typeIndex, menuIndex);
          }}
        />
      );
    return (
      <ExpandMoreIcon
        onClick={() => {
          handleSubMenOpenClick(typeIndex, menuIndex);
        }}
      />
    );
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

  return (
    <Drawer
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
      <List>
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

                    {showMoreOrLessIcon(item.sub_menu, typeIndex, menuIndex)}
                  </ListItem>
                  {renderSubMenu(item.sub_menu, typeIndex, menuIndex)}
                </>
              ))}
            </Fragment>
          ))}
      </List>
    </Drawer>
  );
});

ChurchDrawer.propTypes = {
  handleDrawerClose: func.isRequired,
  drawerAlwaysOpen: bool
};

export default ChurchDrawer;
