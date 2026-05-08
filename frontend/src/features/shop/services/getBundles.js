import api from "@/service/GlobalApi";

const getBundles = async (token) => {
  try {
    return await api.get("/shop/bundles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch bundles API:", error);
    throw error;
  }
};

export default getBundles;
