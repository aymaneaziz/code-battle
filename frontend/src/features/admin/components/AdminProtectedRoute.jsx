import { Loading } from "@/components/common/Loading";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

export function AdminProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/",
}) {
  const { isLoaded, isSignedIn, user } = useUser();

  // loading Clerk session
  if (!isLoaded) return <Loading />;

  // Not logged in
  if (!isSignedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  // Wrong role
  if (requiredRole && user?.publicMetadata?.role !== requiredRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
