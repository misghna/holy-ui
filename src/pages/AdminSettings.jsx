import { useCallback, useMemo, useState } from "react";

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
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";
import useLanguage from "~/hooks/useLanguage";

import Language from "./Language";
import LanguageForm from "./LanguageForm";

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

function AdminSettings() {
  const [activeTab, setActiveTab] = useState(1);
  const { setting } = useGlobalSetting();
  const { labels } = setting;
  const [modelOpen, setModelOpen] = useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    populateLanguageForm,
    deleteLangConfig,
    dialogFormProps,
    handleAddModalClose,
    handleAddModalOpen,
    modalOpenAdd
  } = useLanguage();

  const handleTabChange = useCallback(
    (event, newValue) => {
      setActiveTab(newValue);
    },
    [setActiveTab]
  );

  const MAPPING = {
    0: <Language populateLanguageForm={populateLanguageForm} deleteLanguage={deleteLangConfig} />,
    1: "admin_settings",
    2: "translations",
    3: "other_settings"
  };

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
    const { langConfig, handleChange, errors } = dialogFormProps.dialogProps;
    switch (activeTab) {
      case 0:
        return <LanguageForm languageConfig={{ ...langConfig }} handleChange={handleChange} errors={errors} />;
      case 1:
        return null;
      default:
        return null;
    }
  }, [activeTab, dialogFormProps.dialogProps]);
  const currentForm = useMemo(() => dialogForms(), [dialogForms]);
  return (
    <Container>
      <Box className={classes.root}>
        <div>
          <h2>Admin Settings</h2>
        </div>
        <Box className={classes.searchContainer}>
          <FilterListIcon onClick={handleSearchIcon} />
          <ActionMenu handleClick={handleClick} handleClose={handleClose} actio anchorEl={anchorEl}>
            {renderActionMenu}
          </ActionMenu>
        </Box>
      </Box>
      <Tabs activeTab={activeTab} handleTabChange={handleTabChange}>
        <Tab label={labels?.languages} />
        <Tab label={labels?.admin_settings} />
        <Tab label={labels?.translations} />
        <Tab label={labels?.other_settings} />
      </Tabs>

      {MAPPING[activeTab]}
      <DynamicModal header={labels.search_title} open={modelOpen} handleClose={handleModelClose}></DynamicModal>
      <DynamicModal
        header={"add lang"}
        open={modalOpenAdd}
        handleClose={handleAddModalClose}
        actionLabel={dialogFormProps.actionLabel}
        maxWidth={"md"}
        actionHandler={dialogFormProps.actionHandler}
      >
        {currentForm}
      </DynamicModal>
    </Container>
  );
}

export default AdminSettings;
