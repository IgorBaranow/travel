import { Navigate, Outlet } from "react-router-dom";

import { AppRoutes } from "../AppRoutes";

export default function ProtectedRoute() {
  const user = 
  return auth.token ? <Outlet /> : <Navigate to={AppRoutes.home} />;
}
