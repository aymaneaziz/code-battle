import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export const RedirectAfterLogin = () => {
  const user = useUser();

  if (!user.isLoaded) return null;

  if (!user?.isLoaded) {// rah hna 5asna nsido metadata f clerk back n3rfo wach kml l config dyal l user ola la => (user?.publicMetadata?.isProfileComplete)
    return <Navigate to="/setup" replace />;
  }

  return <Navigate to="/" replace />;
}
