import { useEffect } from "react";

import { makeStyles } from "@mui/styles";
import { Outlet, useParams } from "react-router-dom";

import NavigationHeader from "~/components/Header";

const useStyles = makeStyles(() => ({
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
    maxHeight: "100dvh",
    overflow: "auto"
  }
}));
const Layout = () => {
  const classes = useStyles();
  const params = useParams();
  useEffect(() => {
    document.title = params.category;
  }, [params?.category]);
  return (
    <div className={classes.root}>
      <section className={classes.headerSection}>
        <NavigationHeader title={params.category || ""} />
      </section>
      <section className={classes.bodySection}>
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
