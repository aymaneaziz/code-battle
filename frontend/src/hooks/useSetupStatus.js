import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../service/GlobalApi.js";

export const useSetupStatus = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [setupCompleted, setSetupCompleted] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const checkStatus = async () => {
      try {
        const token = await getToken();
        const result = await api.get("/data/setup-completed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSetupCompleted(result.setupCompleted);
      } catch (err) {
        console.error("Setup Status Hook Error:", err);
        setSetupCompleted(false);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [user, isLoaded, getToken]);

  return { setupCompleted, loading, isLoaded };
};
