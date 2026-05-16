import api from "@/service/GlobalApi";

const getProgress = async (token) => {
  try {
    return await api.get(`/mission/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch Progress API:", error);
    throw error;
  }
};

export default getProgress;
