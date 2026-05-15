/**
 * Match Resolver — determines winner, calculates ELO + XP, updates DB, notifies players.
 *
 * Called when:
 *   - A player's HP hits 0           → reason: "hp_zero"
 *   - A player passes all test cases → reason: "all_tests_passed"
 *   - Timer expires                  → reason: "time_expired" (compare testsPassed)
 *   - A player surrenders            → reason: "surrender"
 */

import User from "../../models/user.model.js";
import { calculateEloDelta } from "./match.elo.js";
import { calculateXp } from "./match.xp.js";
import { getMatch, markResolved, deleteMatch } from "./match.state.js";

function send(ws, payload) {
  if (ws?.readyState === 1) ws.send(JSON.stringify(payload));
}

/**
 * @param {string} matchId
 * @param {string} winnerId     - userId of winner, or null for draw
 * @param {string} loserId      - userId of loser,  or null for draw
 * @param {string} reason       - "hp_zero" | "all_tests_passed" | "time_expired" | "surrender"
 * @param {Map}    clients      - WS clients map
 */
export async function resolveMatch(
  matchId,
  winnerId,
  loserId,
  reason,
  clients,
) {
  const match = getMatch(matchId);
  if (!match || match.resolved) return; // already resolved — guard against race conditions

  markResolved(matchId);

  const isDraw = winnerId === null;
  const p1Id = match.player1Id;
  const p2Id = match.player2Id;

  try {
    // ── Fetch current DB profiles ───────────────────────────────────────────
    const [p1User, p2User] = await Promise.all([
      User.findOne({ userId: p1Id }),
      User.findOne({ userId: p2Id }),
    ]);

    if (!p1User || !p2User) {
      console.error(`[Resolver] Could not find users for match ${matchId}`);
      return;
    }

    const p1Stats = p1User.stats;
    const p2Stats = p2User.stats;

    const p1Elo = p1Stats.elo ?? 400;
    const p2Elo = p2Stats.elo ?? 400;

    // ── Determine outcomes ──────────────────────────────────────────────────
    const getOutcome = (userId) => {
      if (isDraw) return "draw";
      return userId === winnerId ? "win" : "loss";
    };

    const outcome1 = getOutcome(p1Id);
    const outcome2 = getOutcome(p2Id);

    // ── ELO ─────────────────────────────────────────────────────────────────
    const { delta1, delta2 } = calculateEloDelta(p1Elo, p2Elo, outcome1);

    // ── XP ──────────────────────────────────────────────────────────────────
    const totalTests = match.problem.testCases?.length ?? 0;
    // eslint-disable-next-line no-unused-vars
    const matchDuration = Date.now() - match.startedAt;
    const halfTime = match.problem.timeLimitMs
      ? match.problem.timeLimitMs / 2
      : (45 * 60 * 1000) / 2;

    const buildXpParams = (userId, outcome, eloDelta, opponentElo, myElo) => {
      const ps = match.players[userId];
      return {
        outcome,
        difficulty: match.problem.difficulty ?? "Easy",
        testsPassed: ps.testsPassed,
        totalTests,
        submissions: ps.submissions,
        failedSubs: ps.failedSubs,
        maxCombo: ps.combo, // highest combo at end (resets on fail, so this is current run)
        hpZero: ps.hp <= 0,
        speedBonus: ps.finishedAt
          ? match.problem.timeLimitMs - (ps.finishedAt - match.startedAt) >
            halfTime
          : false,
        beatHigherRanked: outcome === "win" && myElo < opponentElo,
        winStreak:
          outcome === "win"
            ? ((p1Id === userId ? p1Stats : p2Stats).currentStreak ?? 0)
            : 0,
      };
    };

    const { total: xp1, breakdown: xpBreakdown1 } = calculateXp(
      buildXpParams(p1Id, outcome1, delta1, p2Elo, p1Elo),
    );
    const { total: xp2, breakdown: xpBreakdown2 } = calculateXp(
      buildXpParams(p2Id, outcome2, delta2, p1Elo, p2Elo),
    );

    // ── DB Update helper ─────────────────────────────────────────────────────
    const updateUser = async (user, outcome, eloDelta, xpEarned) => {
      const s = user.stats;
      const isWin = outcome === "win";
      const isLoss = outcome === "loss";
      const isDraw = outcome === "draw";

      s.elo = Math.max(0, (s.elo ?? 400) + eloDelta);
      s.xp = (s.xp ?? 0) + xpEarned;
      s.wins = (s.wins ?? 0) + (isWin ? 1 : 0);
      s.losses = (s.losses ?? 0) + (isLoss ? 1 : 0);
      s.draws = (s.draws ?? 0) + (isDraw ? 1 : 0);
      s.totalMatches = (s.totalMatches ?? 0) + 1;

      // Streak: increment on win, reset on loss, keep on draw
      if (isWin) s.currentStreak = (s.currentStreak ?? 0) + 1;
      if (isLoss) s.currentStreak = 0;
      s.bestStreak = Math.max(s.bestStreak ?? 0, s.currentStreak ?? 0);

      // Win rate
      s.winRate =
        s.totalMatches > 0
          ? Math.round((s.wins / s.totalMatches) * 100) / 100
          : 0;

      await user.save();
    };

    await Promise.all([
      updateUser(p1User, outcome1, delta1, xp1),
      updateUser(p2User, outcome2, delta2, xp2),
    ]);

    console.log(
      `[Resolver] Match ${matchId} resolved. Reason: ${reason}. Winner: ${winnerId ?? "draw"}`,
    );
    console.log(
      `[Resolver] P1 (${p1Id}): ELO ${p1Elo}→${p1Elo + delta1}, XP +${xp1}`,
    );
    console.log(
      `[Resolver] P2 (${p2Id}): ELO ${p2Elo}→${p2Elo + delta2}, XP +${xp2}`,
    );

    // ── Notify players ───────────────────────────────────────────────────────
    const buildResult = (
      userId,
      outcome,
      eloDelta,
      oldElo,
      xpEarned,
      xpBreakdown,
    ) => ({
      type: "MATCH_RESULT",
      outcome, // "win" | "loss" | "draw"
      reason,
      eloDelta,
      oldElo,
      newElo: Math.max(0, oldElo + eloDelta),
      xpEarned,
      xpBreakdown,
      matchId,
    });

    const p1Ws = clients.get(p1Id);
    const p2Ws = clients.get(p2Id);

    send(p1Ws, buildResult(p1Id, outcome1, delta1, p1Elo, xp1, xpBreakdown1));
    send(p2Ws, buildResult(p2Id, outcome2, delta2, p2Elo, xp2, xpBreakdown2));
  } catch (err) {
    console.error(`[Resolver] Error resolving match ${matchId}:`, err);
  } finally {
    // Clean up after a delay so players can receive the result
    setTimeout(() => deleteMatch(matchId), 10_000);
  }
}
