import { Route, Routes } from "react-router-dom";

import AccountLayout from "@features/ui/layout/AccountLayout/AccountLayout";
import AuthLayout from "@features/ui/layout/AuthLayout";
import DashboardPage from "@pages/account/dashboard";
import TripsPage from "@pages/account/trips";
import HomePage from "@pages/home";
import LoginPage from "@pages/login";
import NotFoundPage from "@pages/not-found";
import SignUpPage from "@pages/sign-up";

import { AppRoutes } from "../AppRoutes";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path={AppRoutes.home} element={<HomePage />} />
      <Route element={<AuthLayout />}>
        <Route path={AppRoutes.signUp} element={<SignUpPage />} />
        <Route path={AppRoutes.login} element={<LoginPage />} />
      </Route>
      {/* Protected Pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AccountLayout />}>
          <Route path={AppRoutes.dashboard} element={<DashboardPage />}></Route>
          <Route path={AppRoutes.tripsd} element={<TripsPage />}></Route>
          <Route path={AppRoutes.dashboard} element={<DashboardPage />}></Route>
        </Route>
      </Route>
      {/* Error Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
