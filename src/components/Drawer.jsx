import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    display: "flex",
    flexDirection: "column"
  },
  listItem: {
    paddingLeft: theme.spacing(2)
  },
  listItemIcon: {
    minWidth: 50
  }
}));

const ChurchDrawer = ({ navigationItems, open, handleDrawerClose }) => {
  const classes = useStyles();

  return (
    <Drawer className={classes.drawer} variant="persisent" anchor="left" open={open}>
      <List>
        {navigationItems.map((item) => (
          <ListItem
            key={item.label}
            button
            onClick={() => {
              console.log(item.path);
              handleDrawerClose();
            }}
          >
            <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
            <ChevronRightIcon />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

ChurchDrawer.propTypes = {
  navigationItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired
};

export default ChurchDrawer;
