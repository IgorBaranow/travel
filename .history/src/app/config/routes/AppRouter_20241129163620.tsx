import { Route, Routes } from "react-router-dom";

import AuthLayout from "@features/ui/layout/AuthLayout";
import DashboardPage from "@pages/account/dashboard";
import HomePage from "@pages/home";
import LoginPage from "@pages/login";
import NotFoundPage from "@pages/not-found";
import SignUpPage from "@pages/sign-up";

import { AppRoutes } from "./AppRoutes";

export default function AppRouter() {
  return (
    <div>
      {" "}
      <Routes>
        <Route path={AppRoutes.home} element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path={AppRoutes.signUp} element={<SignUpPage />} />
          <Route path={AppRoutes.login} element={<LoginPage />} />
        </Route>
        <Route path={AppRoutes.dashboard} element={<DashboardPage />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
