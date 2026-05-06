import api from "../../../service/GlobalApi.js";

// Njibu challenge b iD
export const fetchChallengeDetails = async (challengeId, token) => {
  return await api.get(`/challenges/${challengeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
