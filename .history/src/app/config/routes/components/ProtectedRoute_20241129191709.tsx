import { Navigate, Outlet, useLocation } from "react-router-dom";

import { selectUser } from "@features/auth/store/authSlice";
import { useAppSelector } from "@store/index";

import { AppRoutes } from "../AppRoutes";

interface Pro

export default function ProtectedRoute() {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoutes.home} state={{ from: location }} replace />
  );
}