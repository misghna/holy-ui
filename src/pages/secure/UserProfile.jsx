import React, { useCallback, useMemo, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Container, MenuItem, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import { makeStyles } from "@mui/styles";

import ActionMenu from "~/components/ActionMenu";
import DynamicModal from "~/components/Modal";
import AccessConfig from "~/components/secure/UserProfile/AccessConfig";
import AccessConfigForm from "~/components/secure/UserProfile/AccessConfigForm";
import Tab from "~/components/tabs/Tab";
import Tabs from "~/components/tabs/Tabs";
import useUserAccessConfig from "~/hooks/useUserAccessConfig";

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

function ContentManager() {
  const {
    activeTab,
    handleTabChange,
    labels,
    currentDialogFormProps,
    modalOpenAdd,
    handleAddModalClose,
    handleAddModalOpen,
    populateAccessConfigForm,
    deleteAccessConfig
  } = useUserAccessConfig();

  const [modelOpen, setModelOpen] = useState(false);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const TAB_MAPPING = useMemo(() => {
    return {
      0: <AccessConfig populateAccessConfigForm={populateAccessConfigForm} deleteAccessConfig={deleteAccessConfig} />,
      1: "Access Report"
    };
  }, [deleteAccessConfig, populateAccessConfigForm]);

  const renderTabContent = useMemo(() => {
    return TAB_MAPPING[activeTab];
  }, [TAB_MAPPING, activeTab]);

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
  const handleMenuItemClick = useCallback(
    (action) => {
      let title = "";
      switch (activeTab) {
        case 0:
          title = "Add Access Config";
          break;
        case 1:
          title = "Add Content";
          break;
        default:
          title = "";
          break;
      }

      action(title);
      handleClose();
    },
    [activeTab, handleClose]
  );

  const actionMenuItems = useMemo(
    () => [
      {
        label: "Add New",
        actionHandler: handleAddModalOpen,
        icon: <AddIcon />
      },
      {
        label: labels.action_menu_save,
        actionHandler: () => {},
        icon: <SaveIcon />
      }
    ],
    [handleAddModalOpen, labels.action_menu_save]
  );
  const renderActionMenu = useMemo(
    () =>
      actionMenuItems &&
      actionMenuItems.map((actionMenu, index) => {
        return (
          <MenuItem key={index} onClick={() => handleMenuItemClick(actionMenu.actionHandler)}>
            <ListItemIcon>{actionMenu.icon}</ListItemIcon>
            {actionMenu.label}
          </MenuItem>
        );
      }),
    [actionMenuItems, handleMenuItemClick]
  );

  const dialogForms = useMemo(() => {
    const { formData, handleChange, errors } = currentDialogFormProps.dialogProps;
    switch (activeTab) {
      case 0:
        return <AccessConfigForm formData={formData} handleChange={handleChange} errors={errors} />;
      default:
        return null;
    }
  }, [activeTab, currentDialogFormProps.dialogProps]);

  return (
    <Container>
      <Box className={classes.root}>
        <Typography variant="h5">User Profile</Typography>
        <Box className={classes.searchContainer}>
          <FilterListIcon onClick={handleSearchIcon} />
          <ActionMenu handleClick={handleClick} handleClose={handleClose} anchorEl={anchorEl}>
            {renderActionMenu}
          </ActionMenu>
        </Box>
      </Box>
      <Tabs activeTab={activeTab} handleTabChange={handleTabChange}>
        <Tab label="Access Config" />
        <Tab label="Access Report" />
      </Tabs>

      {renderTabContent}
      <DynamicModal
        header={labels && labels.search_title}
        open={modelOpen}
        handleClose={handleModelClose}
        actionLabel="Search"
      ></DynamicModal>
      <DynamicModal
        header={currentDialogFormProps.dialogHeader}
        open={modalOpenAdd}
        handleClose={handleAddModalClose}
        actionLabel={currentDialogFormProps.actionLabel}
        maxWidth={"md"}
        actionHandler={currentDialogFormProps.actionHandler}
      >
        {dialogForms}
      </DynamicModal>
    </Container>
  );
}

export default ContentManager;
