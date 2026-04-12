import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { selectAuth } from "@features/auth/store/authSlice";
import Loader from "@features/ui/Loader";
import { useAppSelector } from "@store/index";

import { AppRoutes } from "../AppRoutes";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();

  if (auth.status === "loading" || auth.status === "idle") {
    return <Loader />;
  }

  return auth.user ? (
    <>{children}</>
  ) : (
    <Navigate to={AppRoutes.login} state={{ from: location }} replace />
  );
}