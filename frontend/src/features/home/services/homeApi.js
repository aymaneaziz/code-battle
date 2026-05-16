import api from "../../../service/GlobalApi.js";

/// fetchHomeInfo
export const fetchHomeInfo = async (getToken) => {
  const token = await getToken();

  // Promise.all bach nrebho lweqt (parallel calls)
  const [homeInfo, playerInfo] = await Promise.all([
    api.get("/system/data"),
    token
      ? api.get("/home/player", {
          headers: { Authorization: `Bearer ${token}` },
        })
      : null,
  ]);

  return {
    home: homeInfo,
    player: playerInfo,
  };
};
