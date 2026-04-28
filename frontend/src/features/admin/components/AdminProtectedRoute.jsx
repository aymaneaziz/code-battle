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
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-2 text-gray-400">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

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
