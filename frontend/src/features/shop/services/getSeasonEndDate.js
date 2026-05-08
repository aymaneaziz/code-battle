import api from "@/service/GlobalApi";

const getSeasonEndDate = async (token) => {
  try {
    return await api.get("/shop/seasonEndDate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to Season End Date API:", error);
    throw error;
  }
};

export default getSeasonEndDate;
