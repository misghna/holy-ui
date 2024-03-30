import { useContext } from "react";

import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

import { DrawerHeader } from "~/components/Drawer";
import NavigationHeader from "~/components/Header";
import { DRAWER_WIDTH } from "~/constants/theme";
import LayoutContext from "~/contexts/layoutContext";

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
const Layout = () => {
  const { state } = useContext(LayoutContext);
  const { open } = state;
  return (
    <div>
      <section>
        <NavigationHeader />
        <DrawerHeader />
      </section>

      <Section open={open}>
        <Outlet />
      </Section>
    </div>
  );
};

export default Layout;
