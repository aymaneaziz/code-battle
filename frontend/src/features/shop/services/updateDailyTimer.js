const updateDailyTimer = (setDailyTimeLeft) => {
  const now = new Date();
  // 👉 prochain reset = minuit (00:00 du jour suivant)
  const nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0);
  const diff = nextMidnight - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  setDailyTimeLeft(
    `${hours.toString().padStart(2, "0")}h ${minutes
      .toString()
      .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
  );
};

export default updateDailyTimer;
