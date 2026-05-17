import api from "@/service/GlobalApi";

const getGlobalRank = async (token) => {
  try {
    return await api.get("/leaderboard/myrank", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch bundles API:", error);
    throw error;
  }
};

export default getGlobalRank;
