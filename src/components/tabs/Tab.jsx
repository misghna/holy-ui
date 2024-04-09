import { Tab as MuiTab } from "@mui/material";
import PropTypes from "prop-types";

import { useTab } from "./Tabs";

function Tab({ label, index, ...restProps }) {
  const { handleTabChange } = useTab();

  const handleClick = () => {
    handleTabChange(null, index);
  };

  return <MuiTab label={label} onClick={handleClick} {...restProps} />;
}
Tab.propTypes = {
  label: PropTypes.string.isRequired,
  index: PropTypes.number
};
export default Tab;
