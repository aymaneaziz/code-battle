import api from "@/service/GlobalApi";

const putClaimRewards = async (token, body) => {
  try {
    return await api.put("/mission/claim", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch Claim Rewards API:", error);
    throw error;
  }
};

export default putClaimRewards;
