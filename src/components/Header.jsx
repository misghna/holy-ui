import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { string } from "prop-types";

export default function NavigationHeader({ title }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: "capitalize" }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

NavigationHeader.propTypes = {
  title: string
};
