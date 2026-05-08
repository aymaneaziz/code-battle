import api from "@/service/GlobalApi";

const getDailyDeals = async (token) => {
  try {
    return await api.get("/shop/dailyDeals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch daily deals API:", error);
    throw error;
  }
};
export default getDailyDeals;
