import api from "@/service/GlobalApi";

const getSystemInfo = async () => {
  try {
    return await api.get("/system/data");
  } catch (error) {
    console.error("Failed to fetch bundles API:", error);
    throw error;
  }
};

export default getSystemInfo;
