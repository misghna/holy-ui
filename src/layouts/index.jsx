import { useContext, useEffect } from "react";

import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Outlet, useParams } from "react-router-dom";

import { DrawerHeader } from "~/components/Drawer";
import NavigationHeader from "~/components/Header";
import { DRAWER_WIDTH } from "~/constants/theme";
import { LayoutContext } from "~/contexts/LayoutProvider";

const Section = styled("section", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),

  ...(open && {
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
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
  const { state } = useContext(LayoutContext);
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
