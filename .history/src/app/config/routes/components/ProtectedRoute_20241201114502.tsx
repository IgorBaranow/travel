import { Navigate, Outlet, useLocation } from "react-router-dom";

import { selectAuth } from "@features/auth/store/authSlice";
import { useAppSelector } from "@store/index";

import { AppRoutes } from "../AppRoutes";

export default function ProtectedRoute() {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();
  return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoutes.login} state={{ from: location }} replace />
  );
}
