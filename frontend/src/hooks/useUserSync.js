import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

import api from "../service/GlobalApi";
import putMissionProgress from "@/service/putMissionProgress";

export function useUserSync() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const synced = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || synced.current) return;

    const sync = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        await api.post(
          "/user/sync",
          {
            email: user.primaryEmailAddress?.emailAddress,
            username: user.username ?? user.firstName,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        synced.current = true;
        await putMissionProgress(token, "DAILY_LOGIN");
      } catch (err) {
        console.error("User sync failed:", err);
      }
    };

    sync();
  }, [isLoaded, isSignedIn, user, getToken]);
}
