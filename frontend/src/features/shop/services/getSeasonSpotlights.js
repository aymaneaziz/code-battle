import api from "@/service/GlobalApi";

const getSeasonSpotlights = async (token) => {
  try {
    return await api.get("/shop/seasonSpotlights", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch Season Spotlights API:", error);
    throw error;
  }
};

export default getSeasonSpotlights;
