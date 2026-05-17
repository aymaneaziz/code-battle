import api from "../../../service/GlobalApi.js";

/// fetchHomeInfo
export const fetchHomeInfo = async (getToken) => {
  const token = await getToken();

  // Promise.all bach nrebho lweqt (parallel calls)
  const [homeInfo, globalRank, playerInfo] = await Promise.all([
    api.get("/system/data"),
    api.get("/leaderboard/data/10"),
    token
      ? api.get("/home/player", {
          headers: { Authorization: `Bearer ${token}` },
        })
      : null,
  ]);

  return {
    home: homeInfo,
    player: playerInfo,
    globalRank: globalRank,
  };
};

export const fetchMatchHistory = async (token) =>
  api.get("/data/profile/match-history", {
    headers: { Authorization: `Bearer ${token}` },
  });
