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
import useDictionary from "~/hooks/useDictionary";
import useLanguage from "~/hooks/useLanguage";

import Dictionary from "./Dictionary";
import DictionaryForm from "./DictionaryForm";
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
  const [activeTab, setActiveTab] = useState(0);
  const { setting } = useGlobalSetting();
  const { labels } = setting;

  const [modelOpen, setModelOpen] = useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    populateLanguageForm,
    deleteLangConfig,
    dialogFormProps: langDialogFormProps,
    handleAddModalClose: handleLangAddModalClose,
    handleAddModalOpen: handleLangAddModalOpen,
    modalOpenAdd: langModalOpenAdd
  } = useLanguage();

  const {
    dialogFormProps: dictionaryDialogFormProps,
    modalOpenAdd: dictionaryModalOpenAdd,
    handleAddModalClose: handleDictionaryAddModalClose,
    handleAddModalOpen: handleDictionaryAddModalOpen,
    populateDictionaryForm,
    deleteDictionary
  } = useDictionary();

  const handleTabChange = useCallback(
    (event, newValue) => {
      setActiveTab(newValue);
    },
    [setActiveTab]
  );

  const renderTabContent = useMemo(() => {
    const MAPPING = {
      0: <Language populateLanguageForm={populateLanguageForm} deleteLanguage={deleteLangConfig} />,
      1: "admin_settings",
      2: <Dictionary populateDictionaryForm={populateDictionaryForm} deleteDictionary={deleteDictionary} />,
      3: "other_settings"
    };
    return MAPPING[activeTab];
  }, [activeTab, populateLanguageForm, deleteLangConfig, populateDictionaryForm, deleteDictionary]);

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
        actionHandler: activeTab === 0 ? handleLangAddModalOpen : handleDictionaryAddModalOpen,
        icon: <AddIcon />
      },
      {
        label: labels.action_menu_save,
        actionHandler: () => {},
        icon: <SaveIcon />
      }
    ],
    [handleLangAddModalOpen, handleDictionaryAddModalOpen, activeTab, labels.action_menu_save]
  );

  const renderActionMenu = useMemo(
    () =>
      actionMenuItems &&
      actionMenuItems.map((actionMenu, index) => (
        <MenuItem key={index} onClick={() => handleMenuItemClick(actionMenu.actionHandler)}>
          <ListItemIcon>{actionMenu.icon}</ListItemIcon>
          {actionMenu.label}
        </MenuItem>
      )),
    [actionMenuItems, handleMenuItemClick]
  );

  const dialogForms = useCallback(() => {
    const langDialogProps = langDialogFormProps.dialogProps || {};
    const dictionaryDialogProps = dictionaryDialogFormProps.dialogProps || {};
    const { langConfig, handleChange: handleLangChange, errors: langErrors } = langDialogProps;
    const { dictConfig, handleChange: handleDictChange, errors: dictErrors } = dictionaryDialogProps;

    switch (activeTab) {
      case 0:
        return <LanguageForm languageConfig={{ ...langConfig }} handleChange={handleLangChange} errors={langErrors} />;
      case 2:
        return (
          <DictionaryForm dictionaryConfig={{ ...dictConfig }} handleChange={handleDictChange} errors={dictErrors} />
        );
      default:
        return null;
    }
  }, [activeTab, dictionaryDialogFormProps, langDialogFormProps]);

  const currentForm = useMemo(() => dialogForms(), [dialogForms]);

  return (
    <Container>
      <Box className={classes.root}>
        <div>
          <h2>Admin Settings</h2>
        </div>
        <Box className={classes.searchContainer}>
          <FilterListIcon onClick={handleSearchIcon} />
          <ActionMenu handleClick={handleClick} handleClose={handleClose} anchorEl={anchorEl}>
            {renderActionMenu}
          </ActionMenu>
        </Box>
      </Box>
      <Tabs activeTab={activeTab} handleTabChange={handleTabChange}>
        <Tab label={labels?.languages || "Languages"} />
        <Tab label={labels?.admin_settings || "Admin Settings"} />
        <Tab label={labels?.translations || "Translations"} />
        <Tab label={labels?.other_settings || "Other Settings"} />
      </Tabs>

      {renderTabContent}
      <DynamicModal header={labels.search_title} open={modelOpen} handleClose={handleModelClose} />
      <DynamicModal
        header={"Add Language"}
        open={langModalOpenAdd}
        handleClose={handleLangAddModalClose}
        actionLabel={langDialogFormProps.actionLabel}
        maxWidth={"md"}
        actionHandler={langDialogFormProps.actionHandler}
      >
        {currentForm}
      </DynamicModal>
      <DynamicModal
        header={"Add Dictionary"}
        open={dictionaryModalOpenAdd}
        handleClose={handleDictionaryAddModalClose}
        actionLabel={dictionaryDialogFormProps.actionLabel}
        maxWidth={"md"}
        actionHandler={dictionaryDialogFormProps.actionHandler}
      >
        {currentForm}
      </DynamicModal>
    </Container>
  );
}

export default AdminSettings;
