import { useEffect } from "react";

import { makeStyles } from "@mui/styles";
import { Outlet, useParams } from "react-router-dom";

import { DrawerHeader } from "~/components/Drawer";
import NavigationHeader from "~/components/Header";
import { useLayout, actionTypes } from "~/contexts/LayoutProvider";

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100dvh",
    maxHeight: "100dvh",
    display: "flex",
    flexDirection: "column"
  },
  headerSection: {
    position: "relative"
  },
  bodySection: {
    position: "relative",
    maxHeight: "90dvh",
    minHeight: "90dvh",
    overflow: "auto",
    width: `calc(100vw - ${DRAWER_WIDTH})`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: `${DRAWER_WIDTH}px`
  }
}));
function AdminLayout() {
  const { dispatch } = useLayout();
  const params = useParams();
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: actionTypes.TOGGLE_DRAWER });
  }, [dispatch]);

  useEffect(() => {
    document.title = params.category;
  }, [params?.category]);
  return (
    <div className={classes.root}>
      <section className={classes.headerSection}>
        <NavigationHeader title={params.category || ""} drawerAlwaysOpen />
        <DrawerHeader />
      </section>

      <div className={classes.bodySection}>
        <Outlet />
      </div>
    </div>
  );
}
export default AdminLayout;
