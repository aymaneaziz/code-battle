import { Loading } from "@/components/common/Loading";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

export function PlayerProtectedRoute({ redirectTo = "/signin" }) {
  const { isLoaded, isSignedIn } = useUser();

  // Loading Clerk session
  if (!isLoaded) return <Loading />;

  // Not logged in
  if (!isSignedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
