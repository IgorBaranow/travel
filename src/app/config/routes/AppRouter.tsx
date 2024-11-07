import { Route, Routes } from "react-router-dom";

import AuthLayout from "@features/ui/layout/AuthLayout";
import HomePage from "@pages/home";
import LoginPage from "@pages/login";
import NotFoundPage from "@pages/not-found";
import SignUpPage from "@pages/sign-up";

export default function AppRouter() {
  return (
    <div>
      {" "}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
