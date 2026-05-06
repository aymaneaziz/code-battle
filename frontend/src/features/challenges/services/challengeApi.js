import api from "../../../service/GlobalApi.js";

// Fetch all challenges based on filters
export const fetchChallenges = async (filters, token) => {
  try {
    // Build the query string dynamically
    const params = new URLSearchParams();

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

// Fetch the daily challenge
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

// Fetch the user's progress stats for the widget
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
