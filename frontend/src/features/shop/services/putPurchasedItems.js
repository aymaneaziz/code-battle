import api from "@/service/GlobalApi";

const putPurchasedItems = async (token, body) => {
  try {
    return await api.put("/shop/purchase", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch Purchased Items API:", error);
    throw error;
  }
};

export default putPurchasedItems;
