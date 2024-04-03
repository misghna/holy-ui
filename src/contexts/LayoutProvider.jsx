import { useReducer, createContext, useContext } from "react";

import PropTypes from "prop-types";

const LayoutContext = createContext({ state: { open: false }, dispatch: () => {} });

const initialState = {
  open: false
};
export const actionTypes = {
  TOGGLE_DRAWER: "TOGGLE_DRAWER",
  UNTOGGLE_DRAWER: "UNTOGGLE_DRAWER"
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_DRAWER:
      return { open: true };

    case actionTypes.UNTOGGLE_DRAWER:
      return { open: false };

    default:
      return state;
  }
};

export const LayoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <LayoutContext.Provider value={{ state, dispatch }}>{children}</LayoutContext.Provider>;
};
export const useLayout = () => useContext(LayoutContext);
LayoutProvider.propTypes = {
  children: PropTypes.node.isRequired
};
