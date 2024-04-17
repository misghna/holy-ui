import React, { useCallback, useMemo, useState } from "react";

import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Container, MenuItem } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import { makeStyles } from "@mui/styles";

import ActionMenu from "~/components/ActionMenu";
import DynamicModal from "~/components/Modal";
import Tab from "~/components/tabs/Tab";
import Tabs from "~/components/tabs/Tabs";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2)
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(10)
  }
}));

const MAPPING = { 0: "languages", 1: "admin_settings", 2: "translations", 3: "other_settings" };

function AdminSettings() {
  const [activeTab, setActiveTab] = React.useState(1);
  const { setting } = useGlobalSetting();
  const { labels } = setting;
  const [modelOpen, setModelOpen] = useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleTabChange = useCallback(
    (event, newValue) => {
      setActiveTab(newValue);
    },
    [setActiveTab]
  );

  const renderTabContent = useMemo(() => {
    return <div>{`Content for ${labels[MAPPING[activeTab]]}`}</div>;
  }, [activeTab, labels]);

  const handleSearchIcon = useCallback(() => {
    setModelOpen(true);
  }, [setModelOpen]);
  const handleModelClose = useCallback(() => {
    setModelOpen(false);
  }, [setModelOpen]);
  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);
  const handleMenuItemClick = (action) => {
    handleClose();
    console.log("action ", action);
  };
  return (
    <Container>
      <Box className={classes.root}>
        <div>
          <h2>Admin Settings</h2>
        </div>
        <Box className={classes.searchContainer}>
          <SearchIcon fontSize="large" onClick={handleSearchIcon} />
          <ActionMenu handleClick={handleClick} handleClose={handleClose} anchorEl={anchorEl}>
            <MenuItem onClick={() => handleMenuItemClick("Action 1")}>
              <ListItemIcon>
                <SaveIcon />
              </ListItemIcon>
              {labels.action_menu_save}
            </MenuItem>
          </ActionMenu>
        </Box>
      </Box>
      <Tabs activeTab={activeTab} handleTabChange={handleTabChange}>
        <Tab label={labels?.languages} />
        <Tab label={labels?.admin_settings} />
        <Tab label={labels?.translations} />
        <Tab label={labels?.other_settings} />
      </Tabs>

      {renderTabContent}
      <DynamicModal header={labels.search_title} open={modelOpen} handleClose={handleModelClose}></DynamicModal>
    </Container>
  );
}

export default AdminSettings;
