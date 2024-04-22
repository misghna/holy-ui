import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import ReactDOM from "react-dom/client";

import App from "~/App.jsx";
import { GlobalSettingProvider } from "~/contexts/GlobalSettingProvider";
import HolyThemeProvider from "~/contexts/ThemeProvider";

import "~/index.css";
import { AuthProvider } from "./contexts/AuthContext";

function Main() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <GlobalSettingProvider>
          <HolyThemeProvider>
            <CssBaseline />
            <App />
          </HolyThemeProvider>
        </GlobalSettingProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
