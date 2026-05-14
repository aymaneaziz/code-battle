import { Navigate, useLocation } from "react-router-dom";

export function ChallengeProtectedRoute({ children }) {
  const location = useLocation();

  // If the secret "fromVault" flag is missing, redirect to challenges
  if (!location.state?.fromVault) {
    return <Navigate to="/challenges" replace />;
  }

  return children;
}
