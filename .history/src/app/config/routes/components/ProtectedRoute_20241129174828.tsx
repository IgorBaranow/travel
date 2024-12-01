import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const auth = { token: false };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}
