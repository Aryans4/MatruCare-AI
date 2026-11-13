import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const location = useLocation();

  const token = sessionStorage.getItem("token");

  // OTP verification is accessed through the signup flow.
  const verificationEmail = sessionStorage.getItem("verificationEmail");

  if (location.pathname === "/verify-otp") {
    return verificationEmail ? (
      <Outlet />
    ) : (
      <Navigate to="/signup" replace />
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;