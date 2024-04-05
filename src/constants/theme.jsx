import { green, purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[900]
    },
    secondary: {
      main: green[500]
    }
  }
});

export const DRAWER_WIDTH = 240;
