import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import ReactDOM from "react-dom/client";

import App from "~/App.jsx";

import ThemeProvider from "./contexts/ThemeProvider";

import "~/index.css";

function Main() {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
