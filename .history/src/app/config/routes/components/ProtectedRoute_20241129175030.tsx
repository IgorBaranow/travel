import { Navigate, Outlet } from "react-router-dom";

import { AppRoutes } from "../AppRoutes";

export default function ProtectedRoute() {
  const auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to={AppRoutes.home} />;
}
