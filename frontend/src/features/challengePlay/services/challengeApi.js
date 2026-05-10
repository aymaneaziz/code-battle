import api from "../../../service/GlobalApi.js";

// Njibu challenge b iD
export const fetchChallengeDetails = async (challengeId, token) => {
  return await api.get(`/challenges/${challengeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Run code for a challenge
export const runChallengeCode = async (payload, token) => {
  return await api.post("/execution/run", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
