import { createContext, useContext, useState } from "react";

import { node } from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(JSON.parse(localStorage.getItem("auth") || "{}") || {});

  return <AuthContext.Provider value={{ authState, setAuthState }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: node.isRequired
};
