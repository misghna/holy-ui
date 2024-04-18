import { useEffect } from "react";

import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Outlet, useParams } from "react-router-dom";

import { DrawerHeader } from "~/components/Drawer";
import NavigationHeader from "~/components/Header";
import { useLayout } from "~/contexts/LayoutProvider";

const Section = styled("section")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  })
}));

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
  const { state } = useLayout();
  const { open } = state;

  const classes = useStyles();
  const params = useParams();
  useEffect(() => {
    document.title = params.category;
  }, [params?.category]);
  return (
    <div className={classes.root}>
      <section className={classes.headerSection}>
        <NavigationHeader title={params.category || ""} />
        <DrawerHeader />
      </section>

      <Section open={open}>
        <Outlet />
      </Section>
    </div>
  );
};

export default Layout;
