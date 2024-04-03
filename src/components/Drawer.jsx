import React, { Fragment, useMemo, useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ListSubheader from "@mui/material/ListSubheader";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { DRAWER_WIDTH } from "~/constants/theme";
import { useLayoutContext } from "~/contexts/LayoutProvider";
import { useSettingContext } from "~/contexts/SettingProvider";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

const ChurchDrawer = React.memo(function ChurchDrawer({ handleDrawerClose }) {
  const { state: drawerState } = useLayoutContext();

  const { open } = drawerState;

  const theme = useTheme();
  const { state } = useSettingContext();
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
              <ListItem
                key={item.name}
                button
                onClick={() => {
                  navigate(item.url);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
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
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box"
        }
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <List>
        {groupedMenu &&
          Object.entries(groupedMenu).map((items, typeIndex) => (
            <Fragment key={items[0]}>
              <ListSubheader>{items[0] === "public" ? "Public" : "Secure"}</ListSubheader>
              <Divider />
              {items[1].map((item, menuIndex) => (
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
  handleDrawerClose: PropTypes.func.isRequired
};

export default ChurchDrawer;
