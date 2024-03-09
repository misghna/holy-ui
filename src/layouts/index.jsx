import { Outlet } from "react-router-dom";

import NavigationHeader from "~/components/Header";

const Layout = () => {
  return (
    <div className="container">
      <section>
        <NavigationHeader />
      </section>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
