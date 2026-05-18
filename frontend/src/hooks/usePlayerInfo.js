import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { fetchHomeInfo } from "@/features/home/services/homeApi";

const POLL_INTERVAL_MS = 500000; // zadt hadi ghir bach dir refresh 7ta nrigloha

export function usePlayerInfo() {
  const { getToken } = useAuth();
  const [state, setState] = useState({
    userId: null,
    stats: null,
    playerInfo: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    const fetch = () => {
      fetchHomeInfo(getToken)
        .then((data) => {
          if (cancelled) return;
          const playerInfo = data?.player?.playerInfo ?? null;
          setState({
            userId: playerInfo?.userId ?? null,
            stats: playerInfo?.stats ?? null,
            playerInfo,
            loading: false,
          });
        })
        .catch(() => {
          if (cancelled) return;
          setState((prev) => ({ ...prev, loading: false }));
        });
    };

    fetch();

    const interval = setInterval(fetch, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [getToken]);

  return state;
}
