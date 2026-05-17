import api from "@/service/GlobalApi";

const getGlobalRank = async () => {
  try {
    return await api.get("/leaderboard/data");
  } catch (error) {
    console.error("Failed to fetch bundles API:", error);
    throw error;
  }
};

export default getGlobalRank;
