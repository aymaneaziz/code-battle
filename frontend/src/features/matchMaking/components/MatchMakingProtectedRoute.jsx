import { Navigate, useLocation } from "react-router-dom";

export function MatchMakingProtectedRoute({ children }) {
  const location = useLocation();

  // If the secret "fromStandard" flag is missing, redirect home
  if (!location.state?.fromStandard) {
    return <Navigate to="/" replace />;
  }

  return children;
}
