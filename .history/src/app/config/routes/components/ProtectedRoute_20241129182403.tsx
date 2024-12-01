import { Navigate, Outlet } from "react-router-dom";

import { selectUser } from "@features/auth/store/authSlice";
import { useAppSelector } from "@store/index";

import { AppRoutes } from "../AppRoutes";

export default function ProtectedRoute() {
  const user = useAppSelector(selectUser);
  return auth.token ? <Outlet /> : <Navigate to={AppRoutes.home} />;
}
