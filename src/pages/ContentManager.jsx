import React, { useCallback, useMemo, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Container, MenuItem } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import { makeStyles } from "@mui/styles";

import ActionMenu from "~/components/ActionMenu";
import DynamicModal from "~/components/Modal";
import Tab from "~/components/tabs/Tab";
import Tabs from "~/components/tabs/Tabs";
import useContentManager from "~/hooks/useContentManager";
import ContentForm from "~/pages/ContentForm";
import DocumentForm from "~/pages/DocumentForm";
import PageConfig from "~/pages/PageConfig";
import PageConfigForm from "~/pages/PageConfigForm";

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
    populatePageConfigForm,
    deletePageConfig
  } = useContentManager();

  const [modelOpen, setModelOpen] = useState(false);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const TAB_MAPPING = useMemo(() => {
    return {
      0: (
        <PageConfig
          populatePageConfigForm={populatePageConfigForm}
          deletePageConfig={deletePageConfig}
          handleAddModalOpen={handleAddModalOpen}
        />
      ),
      1: "content_manager",
      2: "document"
    };
  }, [deletePageConfig, handleAddModalOpen, populatePageConfigForm]);

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
      if (activeTab === 0) {
        title = "Add Page Config";
      } else if (activeTab === 1) {
        title = "Add Content";
      } else {
        title = "Add Document";
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

  const dialogForms = useCallback(() => {
    const { pageConfig, handleChange, errors, addImageSelectionInPageConfig } = currentDialogFormProps.dialogProps;
    switch (activeTab) {
      case 0:
        return (
          <PageConfigForm
            pageConfig={{ ...pageConfig }}
            addImageSelectionInPageConfig={addImageSelectionInPageConfig}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 1:
        return <ContentForm {...currentDialogFormProps.dialogProps} />;
      default:
        return <DocumentForm {...currentDialogFormProps.dialogProps} />;
    }
  }, [activeTab, currentDialogFormProps.dialogProps]);
  const currentForm = useMemo(() => dialogForms(), [dialogForms]);

  return (
    <Container>
      <Box className={classes.root}>
        <div>
          <h2>Content Manager</h2>
        </div>
        <Box className={classes.searchContainer}>
          <FilterListIcon onClick={handleSearchIcon} />
          <ActionMenu handleClick={handleClick} handleClose={handleClose} actio anchorEl={anchorEl}>
            {renderActionMenu}
          </ActionMenu>
        </Box>
      </Box>
      <Tabs activeTab={activeTab} handleTabChange={handleTabChange}>
        <Tab label={labels && labels?.page_config} />
        <Tab label={labels && labels?.content_manager} />
        <Tab label={labels && labels?.document} />
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
        {currentForm}
      </DynamicModal>
    </Container>
  );
}

export default ContentManager;
