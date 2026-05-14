import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import wsClient from "@/service/wsClient";
import { useUserId } from "./useUserId";

export function useWsConnection() {
  const { isSignedIn } = useAuth();
  const userId = useUserId();

  useEffect(() => {
    if (!isSignedIn || !userId) return;
    wsClient.ensureConnected(userId);

    return () => {
      // Don't disconnect on unmount — connection is global
    };
  }, [isSignedIn, userId]);
}
