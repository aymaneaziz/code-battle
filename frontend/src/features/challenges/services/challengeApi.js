import api from "../../../service/GlobalApi.js";

// Njibu ga3 les challenges 3la hsab lfilters li dar l user
export const fetchChallenges = async (filters, token) => {
  try {
    // Kandiro lbuild dyal query string bghit nchof chno bgha luser
    const params = new URLSearchParams();
    // kadir gestion de format o l (codage) dyl Url ex : /challenges?difficulty=Hard&status=solved

    if (filters.difficulty && filters.difficulty !== "All") {
      params.append("difficulty", filters.difficulty);
    }
    if (filters.status && filters.status !== "All") {
      params.append("status", filters.status);
    }
    if (filters.search) {
      params.append("search", filters.search);
    }

    const queryString = params.toString() ? `?${params.toString()}` : "";

    return await api.get(`/challenges${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch challenges API:", error);
    throw error;
  }
};

// Njibu lchallenge dyal l-youm
export const fetchDailyChallenge = async (token) => {
  try {
    return await api.get("/challenges/daily", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch daily challenge API:", error);
    throw error;
  }
};

// Njibu lprogres dyal luser fin wsel f les stats
export const fetchUserProgress = async (token) => {
  try {
    return await api.get("/challenges/progress", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch user progress API:", error);
    throw error;
  }
};
