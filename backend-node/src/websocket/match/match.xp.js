// XP Calculation for a completed match.
const BASE_XP = { Easy: 80, Medium: 160, Hard: 300, Extreme: 500 };

const COMBO_MULTIPLIER = (combo) => {
  if (combo >= 5) return 1.5;
  if (combo === 4) return 1.35;
  if (combo === 3) return 1.2;
  if (combo === 2) return 1.1;
  return 1.0;
};

export function calculateXp({
  outcome,
  difficulty,
  testsPassed,
  totalTests,
  submissions,
  failedSubs,
  maxCombo,
  hpZero,
  speedBonus,
  beatHigherRanked,
  winStreak,
}) {
  const base = BASE_XP[difficulty] ?? 80;

  let bonuses = 0;
  const breakdown = {
    base,
    bonuses: {},
    penalties: {},
    multiplier: 1,
    hpPenalty: false,
  };

  // ── Bonuses ──────────────────────────────────────────────────────────────
  if (outcome === "win") {
    bonuses += 100;
    breakdown.bonuses.win = 100;
  }

  const testBonus = testsPassed * 15;
  bonuses += testBonus;
  breakdown.bonuses.testsPassed = testBonus;

  if (speedBonus) {
    bonuses += 40;
    breakdown.bonuses.speed = 40;
  }

  const isPerfect = testsPassed === totalTests && submissions === 1;
  if (isPerfect) {
    bonuses += 80;
    breakdown.bonuses.perfectRun = 80;
  }

  if (beatHigherRanked && outcome === "win") {
    bonuses += 50;
    breakdown.bonuses.beatHigherRanked = 50;
  }

  const streakLevel = Math.min(winStreak, 10);
  if (streakLevel > 0) {
    const streakBonus = streakLevel * 10;
    bonuses += streakBonus;
    breakdown.bonuses.streak = streakBonus;
  }

  // ── Penalties ─────────────────────────────────────────────────────────────
  let penalties = 0;
  const failPenalty = failedSubs * 5;
  penalties += failPenalty;
  if (failPenalty > 0) breakdown.penalties.failedSubmissions = -failPenalty;

  // ── Combo multiplier ──────────────────────────────────────────────────────
  const multiplier = COMBO_MULTIPLIER(maxCombo);
  breakdown.multiplier = multiplier;

  // ── Subtotal ──────────────────────────────────────────────────────────────
  let total = Math.round((base + bonuses - penalties) * multiplier);
  total = Math.max(0, total); // never negative before HP penalty

  // ── HP zero penalty (applied after multiplier) ────────────────────────────
  if (hpZero) {
    total = Math.round(total * 0.5);
    breakdown.hpPenalty = true;
    breakdown.penalties.hpZero = "−50% of total";
  }

  breakdown.total = total;
  return { total, breakdown };
}
