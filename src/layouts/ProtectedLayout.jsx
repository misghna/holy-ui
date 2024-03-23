import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  // eslint-disable-next-line no-constant-condition
  if (false) {
    // simulate auth
    return <Outlet />;
  }
  return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default ProtectedRoute;
