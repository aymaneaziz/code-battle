import api from "@/service/GlobalApi";
import { getToken } from "@clerk/react";

const weeklyTimer = async (setWeeklyTimeLeft) => {
  try {
    const token = await getToken();
    if (!token) return;
    const res = await api.get("/system/weeklyEndDate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const weeklyEndDate = res.weeklyEndDate;
    const now = new Date();
    const end = weeklyEndDate ? new Date(weeklyEndDate) : null;

    if (!end) return;
    const diff = end - now;
    if (diff <= 0) {
      setWeeklyTimeLeft("Week Ended");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    setWeeklyTimeLeft(`${days}d ${hours}h ${minutes}m`);
  } catch (error) {
    console.error("Failed to Weekly End Date API:", error);
    throw error;
  }
};

export default weeklyTimer;
