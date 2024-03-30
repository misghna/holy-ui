import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "~/context/AuthContext";

const ProtectedRoute = () => {
  const location = useLocation();
  const { authState } = useAuth();
   
  if (authState.token?.accessToken) {
    return <Outlet />;
  }
  return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default ProtectedRoute;
