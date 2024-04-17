import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import ReactDOM from "react-dom/client";

import App from "~/App.jsx";

import HolyThemeProvider from "./contexts/ThemeProvider";

import "~/index.css";

function Main() {
  return (
    <React.StrictMode>
      <HolyThemeProvider>
        <CssBaseline />
        <App />
      </HolyThemeProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
