import { Navigate, useLocation } from "react-router-dom";

export function MatchProtectedRoute({ children }) {
  const location = useLocation();

  // If the secret "fromMatchmaking" flag is missing, redirect home
  if (!location.state?.fromMatchmaking) {
    return <Navigate to="/" replace />;
  }

  return children;
}
