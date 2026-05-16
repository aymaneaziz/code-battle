import api from "@/service/GlobalApi";
import { getToken } from "@clerk/react";

const updateSeasonTimer = async (setSeasonTimeLeft) => {
  try {
    const token = await getToken();
    if (!token) return;
    const res = await api.get("/system/seasonEndDate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const seasonEndDate = res.seasonEndDate;
    const now = new Date();
    const end = seasonEndDate ? new Date(seasonEndDate) : null;

    if (!end) return;
    const diff = end - now;
    if (diff <= 0) {
      setSeasonTimeLeft("Season Ended");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    setSeasonTimeLeft(`${days}d ${hours}h`);
  } catch (error) {
    console.error("Failed to Season End Date API:", error);
    throw error;
  }
};
export default updateSeasonTimer;
