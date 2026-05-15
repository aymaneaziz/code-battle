import api from "@/service/GlobalApi";

const putMissionProgress = async (token, type) => {
  try {
    return await api.put(
      "/mission/progress",
      {
        type,
      } /*"DAILY_LOGIN", "WIN_MATCH", "PLAY_MATCH", "BUY_ITEM", "USE_POWERUP"*/,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch Progress API:", error);
    throw error;
  }
};

export default putMissionProgress;
