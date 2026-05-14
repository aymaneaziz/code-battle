import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { fetchHomeInfo } from "@/features/home/services/homeApi";

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

    return () => {
      cancelled = true;
    };
  }, [getToken]);

  return state;
}
