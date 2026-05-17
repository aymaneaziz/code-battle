import wsClient from "../service/wsClient";
import { useState, useEffect } from "react";

export const usePlayerStatus = (userId) => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!userId) return;
    wsClient.ensureConnected(userId);

    //  if socket is already open, player is online
    setIsOnline(wsClient.ws?.readyState === WebSocket.OPEN);
    // Helper to sync state
    const updateStatus = () => {
      setIsOnline(wsClient.ws?.readyState === WebSocket.OPEN);
    };

    const statusInterval = setInterval(updateStatus, 3000);

    return () => {
      clearInterval(statusInterval);
    };
  }, [userId]);

  return isOnline;
};
