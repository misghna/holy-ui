import { makeStyles } from "@mui/styles";
import { Outlet } from "react-router-dom";

import NavigationHeader from "~/components/Header";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: "100dvh",
    direction: "flex",
    flexDirection: "column"
  },
  headerSection: {
    position: "relative"
  },
  bodySection: {
    position: "relative",
    maxHeight: "100dvh",
    overflow: "auto"
  }
}));
const Layout = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <section className={classes.headerSection}>
        <NavigationHeader />
      </section>
      <section className={classes.bodySection}>
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
