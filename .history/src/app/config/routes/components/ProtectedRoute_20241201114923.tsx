import { Navigate, Outlet, useLocation } from "react-router-dom";

import { selectAuth } from "@features/auth/store/authSlice";
import Loader from "@features/ui/Loader";
import { useAppSelector } from "@store/index";

import { AppRoutes } from "../AppRoutes";

export default function ProtectedRoute() {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();

  if (auth.status === "loading" || auth.status === "idle") {
    return <Loader />;
  }
  return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoutes.login} state={{ from: location }} replace />
  );
}
