import React, { Fragment, useContext, useMemo, useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { DRAWER_WIDTH } from "~/constants/theme";
import LayoutContext from "~/contexts/layoutContext";
import SettingContext from "~/contexts/settingContext";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

const ChurchDrawer = React.memo(function ChurchDrawer({ handleDrawerClose }) {
  const { state: drawerState } = useContext(LayoutContext);

  const { open } = drawerState;

  const theme = useTheme();
  const { state } = useContext(SettingContext);
  const navigate = useNavigate();
  const { setting } = state;
  const menu = setting.menu;

  const [isSubMenOpen, setIsSubMenOpen] = useState(Array(menu.length).fill(false));

  const groupedMenu = useMemo(
    () =>
      menu.reduce((acc, item) => {
        acc[item.type] = acc[item.type] || [];
        acc[item.type].push(item);
        return acc;
      }, {}),
    [menu]
  );

  const renderSubMenu = (item, index) => {
    if (item?.submenu?.length == 0) return null;
    return (
      <Collapse in={isSubMenOpen[index]} timeout="auto" unmountOnExit>
        <List disablePadding>
          {item?.submenu &&
            item?.submenu.map((item) => (
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
  const showMoreOrLessIcon = (submenu, index) => {
    if (submenu.length === 0) return null;
    if (isSubMenOpen[index])
      return (
        <ExpandLessIcon
          onClick={() => {
            handleSubMenCloseClick(index);
          }}
        />
      );
    return (
      <ExpandMoreIcon
        onClick={() => {
          handleSubMenOpenClick(index);
        }}
      />
    );
  };
  const handleSubMenOpenClick = (index) => {
    const openStates = [...isSubMenOpen];
    openStates[index] = true;
    setIsSubMenOpen(openStates);
  };
  const handleSubMenCloseClick = (index) => {
    const openStates = [...isSubMenOpen];
    openStates[index] = false;
    setIsSubMenOpen(openStates);
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
          Object.entries(groupedMenu).map((items, index) => (
            <Fragment key={items[0] + index}>
              <Divider />
              {items[1].map((item, index) => (
                <>
                  <ListItem
                    key={item.name}
                    button
                    onClick={() => {
                      if (item.sub_menu.length > 0 && !isSubMenOpen[index]) {
                        handleSubMenOpenClick(index);
                      } else {
                        setIsSubMenOpen(Array(menu.length).fill(false));
                        navigate(item.url);
                      }
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />

                    {showMoreOrLessIcon(item.sub_menu, index)}
                  </ListItem>
                  {renderSubMenu(item, index)}
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
