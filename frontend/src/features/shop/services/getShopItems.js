import api from "@/service/GlobalApi";

const getShopItems = async (token) => {
  try {
    return await api.get("/shop/shopItems", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch shop items API:", error);
    throw error;
  }
};

export default getShopItems;
