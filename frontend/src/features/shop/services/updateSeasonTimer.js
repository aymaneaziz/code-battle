const updateSeasonTimer = (data, setSeasonTimeLeft) => {
  const seasonEndDate = data?.seasonEndDate?.seasonEndDate || null;
  const now = new Date();
  const end = seasonEndDate ? new Date(seasonEndDate) : null;
  if (!end) return;
  const diff = end - now;
  if (diff <= 0) {
    setSeasonTimeLeft("Season Ended");
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  setSeasonTimeLeft(`${days}d ${hours}h`);
};

export default updateSeasonTimer;
