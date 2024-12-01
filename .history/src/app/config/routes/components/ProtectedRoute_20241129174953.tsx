import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}
