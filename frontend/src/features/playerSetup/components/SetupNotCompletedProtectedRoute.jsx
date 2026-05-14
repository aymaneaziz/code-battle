import { Navigate, Outlet } from "react-router-dom";

import { Loading } from "@/components/common/Loading";
import { useSetupStatus } from "../hooks/useSetupStatus";

export const SetupNotCompletedProtectedRoute = ({
  children,
  redirectTo = "/profile",
}) => {
  const { setupCompleted, loading, isLoaded } = useSetupStatus();

  if (!isLoaded || loading) return <Loading />;

  // Si daja fini -> Redirige vers Profile
  if (setupCompleted === true) {
    return <Navigate to={redirectTo} replace />;
  }

  return children || <Outlet />;
};
