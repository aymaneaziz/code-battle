import { useEffect, useRef, useState } from "react";
import wsClient from "@/service/wsClient";

// Match countdown timer.
export function useMatchTimer(
  durationMs = 45 * 60 * 1000,
  matchId,
  userId,
  active = true,
) {
  const [remaining, setRemaining] = useState(durationMs);
  const sentExpiredRef = useRef(false);

  useEffect(() => {
    if (!active || !matchId || !userId) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);

          // Only one player needs to send this — server deduplicates
          if (!sentExpiredRef.current) {
            sentExpiredRef.current = true;
            wsClient.send({ type: "TIME_EXPIRED", matchId, userId });
            console.log("[Timer] TIME_EXPIRED sent.");
          }

          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, matchId, userId]);

  const totalSeconds = Math.floor(remaining / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const percentLeft = Math.round((remaining / durationMs) * 100);

  return { minutes, seconds, isExpired: remaining === 0, percentLeft };
}
