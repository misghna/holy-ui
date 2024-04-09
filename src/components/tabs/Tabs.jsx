import React, { createContext, useContext } from "react";

import { Box, Tabs as MuiTabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const TabContext = createContext();
const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    marginBottom: theme.spacing(2)
  }
}));

function Tabs({ children, activeTab = 0, handleTabChange }) {
  const classes = useStyles();
  return (
    <TabContext.Provider value={{ activeTab, handleTabChange }}>
      <Box className={classes.tabsContainer} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs value={activeTab} onChange={handleTabChange} indicatorColor="primary">
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, { index });
          })}
        </MuiTabs>
      </Box>
    </TabContext.Provider>
  );
}
export const useTab = () => useContext(TabContext);
Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  activeTab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired
};
export default Tabs;
