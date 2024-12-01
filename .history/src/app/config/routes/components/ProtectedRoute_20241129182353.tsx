import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@store/index";

import { AppRoutes } from "../AppRoutes";

export default function ProtectedRoute() {
  const user = useAppSelector();
  return auth.token ? <Outlet /> : <Navigate to={AppRoutes.home} />;
}
