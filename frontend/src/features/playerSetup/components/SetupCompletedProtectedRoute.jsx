import { Navigate, Outlet } from "react-router-dom";

import { Loading } from "@/components/common/Loading";
import { useSetupStatus } from "../services/useSetupStatus";

export const SetupCompletedProtectedRoute = ({
  children,
  redirectTo = "/setup",
}) => {
  const { setupCompleted, loading, isLoaded } = useSetupStatus();

  if (!isLoaded || loading) return <Loading />;

  // Si pas fini -> Redirige vers Setup
  if (setupCompleted === false) {
    return <Navigate to={redirectTo} replace />;
  }

  return children || <Outlet />;
};
