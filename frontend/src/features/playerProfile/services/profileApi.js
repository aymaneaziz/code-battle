import api from "@/service/GlobalApi";

export const fetchProfile = async (token) => {
  return await api.get("/data/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProfile = async (formData, token) => {
  return await api.put("/data/profile", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
