import api from "@/service/GlobalApi";

const getMission = async (token, missionCategory) => {
  try {
    return await api.get(`/mission/data/${missionCategory}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch bundles API:", error);
    throw error;
  }
};

export default getMission;
