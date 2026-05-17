import User from "../../models/user.model.js";
import { calculateEloDelta } from "./match.elo.js";
import { calculateXp } from "./match.xp.js";
import { getMatch, markResolved, deleteMatch } from "./match.state.js";
import MatchHistory from "../../models/GameplayModels/matchHistory.model.js";

function send(ws, payload) {
  if (ws?.readyState === 1) ws.send(JSON.stringify(payload));
}

// --- Rewards--------
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildRewards(outcome) {
  if (outcome === "win") {
    return {
      coinsEarned: randomInt(1, 10),
      gemsEarned: randomInt(1, 5),
    };
  }
  if (outcome === "draw") {
    return {
      coinsEarned: randomInt(1, 3),
      gemsEarned: 0,
    };
  }
  // loss
  return { coinsEarned: 0, gemsEarned: 0 };
}
const DIFFICULTY_RANK = { Easy: 1, Medium: 2, Hard: 3, Extreme: 4 };

// ha chno wa9e3 hna :  — determines winner, calculates ELO + XP, updates DB, notifies players.
// ofo9ach kn3ytolha :  reason = "hp_zero" "all_tests_passed" "time_expired" "surrender"
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
  const { player1Id, player2Id } = match;

  try {
    // ── Fetch current DB profiles ───────────────────────────────────────────
    const [p1User, p2User] = await Promise.all([
      User.findOne({ userId: player1Id }),
      User.findOne({ userId: player2Id }),
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

    const outcome1 = getOutcome(player1Id);
    const outcome2 = getOutcome(player2Id);

    // ── ELO ─────────────────────────────────────────────────────────────────
    const { delta1, delta2 } = calculateEloDelta(p1Elo, p2Elo, outcome1);

    // ── XP ──────────────────────────────────────────────────────────────────
    const totalTests = match.problem.testCases?.length ?? 0;
    // eslint-disable-next-line no-unused-vars
    const matchDuration = Date.now() - match.startedAt;
    const halfTime = match.problem.timeArenaS
      ? (match.problem.timeArenaS * 1000) / 2
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
          ? match.problem.timeArenaS - (ps.finishedAt - match.startedAt) >
            halfTime
          : false,
        beatHigherRanked: outcome === "win" && myElo < opponentElo,
        winStreak:
          outcome === "win"
            ? ((player1Id === userId ? p1Stats : p2Stats).currentStreak ?? 0)
            : 0,
      };
    };

    const { total: xp1, breakdown: xpBreakdown1 } = calculateXp(
      buildXpParams(player1Id, outcome1, delta1, p2Elo, p1Elo),
    );
    const { total: xp2, breakdown: xpBreakdown2 } = calculateXp(
      buildXpParams(player2Id, outcome2, delta2, p1Elo, p2Elo),
    );
    // ── Coins + Gems ─────────────────────────────────────────────────────────
    const rewards1 = buildRewards(outcome1);
    const rewards2 = buildRewards(outcome2);

    const ply1 = match.players[player1Id];
    const ply2 = match.players[player2Id];

    // solveTimeMs = time from match start to when the player passed all tests
    const solveTimeMs1 =
      ply1.finishedAt != null ? ply1.finishedAt - match.startedAt : null;
    const solveTimeMs2 =
      ply2.finishedAt != null ? ply2.finishedAt - match.startedAt : null;

    // ── DB Update helper ─────────────────────────────────────────────────────
    const updateUser = async (
      user,
      outcome,
      eloDelta,
      xpEarned,
      rewards,
      solveTimeMs,
      difficulty,
    ) => {
      const s = user.stats;
      const isWin = outcome === "win";
      const isLoss = outcome === "loss";
      const isDraw = outcome === "draw";

      s.elo = Math.max(0, (s.elo ?? 400) + eloDelta);
      s.xp = (s.xp ?? 0) + xpEarned;
      s.coins = (s.coins ?? 0) + rewards.coinsEarned;
      s.gems = (s.gems ?? 0) + rewards.gemsEarned;
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

      // Here we only do a quick live update as a shortcut
      if (solveTimeMs != null) {
        if (!s.fastestSolveTime || solveTimeMs < s.fastestSolveTime) {
          s.fastestSolveTime = solveTimeMs;
        }
        // rolling average — accurate recompute happens in profile controller
        const prevTotal = s.totalMatches - 1;
        const prevAvg = s.averageSolveTime ?? solveTimeMs;
        s.averageSolveTime = Math.round(
          (prevAvg * prevTotal + solveTimeMs) / s.totalMatches,
        );
      }

      // ── hardestWin ────────────────────────────────────────────────────────
      if (isWin) {
        const currentRank = DIFFICULTY_RANK[difficulty] ?? 0;
        const previousRank = DIFFICULTY_RANK[s.hardestWin] ?? 0;
        if (currentRank > previousRank) s.hardestWin = difficulty;
      }

      await user.save();
    };

    await Promise.all([
      updateUser(
        p1User,
        outcome1,
        delta1,
        xp1,
        rewards1,
        solveTimeMs1,
        match.problem.difficulty,
      ),
      updateUser(
        p2User,
        outcome2,
        delta2,
        xp2,
        rewards2,
        solveTimeMs2,
        match.problem.difficulty,
      ),
    ]);

    // ── Save MatchHistory ─────────────────────────────────────────────────────
    const ps1 = match.players[player1Id];
    const ps2 = match.players[player2Id];

    await MatchHistory.create({
      matchId,
      problemId: String(match.problem._id ?? match.problem.problemId),
      problemTitle: match.problem.title,
      difficulty: match.problem.difficulty,
      reason,
      player1: {
        userId: player1Id,
        displayName: p1User.displayName,
        outcome: outcome1,
        eleBefore: p1Elo,
        eloAfter: Math.max(0, p1Elo + delta1),
        eloDelta: delta1,
        xpEarned: xp1,
        coinsEarned: rewards1.coinsEarned,
        gemsEarned: rewards1.gemsEarned,
        hpRemaining: ps1.hp,
        testsPassed: ps1.testsPassed,
        submissions: ps1.submissions,
        solveTimeMs: solveTimeMs1,
      },
      player2: {
        userId: player2Id,
        displayName: p2User.displayName,
        outcome: outcome2,
        eloBefore: p2Elo,
        eloAfter: Math.max(0, p2Elo + delta2),
        eloDelta: delta2,
        xpEarned: xp2,
        coinsEarned: rewards2.coinsEarned,
        gemsEarned: rewards2.gemsEarned,
        hpRemaining: ps2.hp,
        testsPassed: ps2.testsPassed,
        submissions: ps2.submissions,
        solveTimeMs: solveTimeMs2,
      },
      durationMs: Date.now() - match.startedAt,
    });

    console.log(
      `[Resolver] ${matchId} resolved. Reason: ${reason}. Winner: ${winnerId ?? "draw"}`,
    );
    // ── Notify players ───────────────────────────────────────────────────────
    const buildResult = (
      userId,
      outcome,
      eloDelta,
      oldElo,
      xpEarned,
      xpBreakdown,
      rewards,
    ) => ({
      type: "MATCH_RESULT",
      outcome, // "win" | "loss" | "draw"
      reason,
      eloDelta,
      oldElo,
      newElo: Math.max(0, oldElo + eloDelta),
      xpEarned,
      xpBreakdown,
      coinsEarned: rewards.coinsEarned,
      gemsEarned: rewards.gemsEarned,
      matchId,
    });

    const p1Ws = clients.get(player1Id);
    const p2Ws = clients.get(player2Id);

    send(
      p1Ws,
      buildResult(
        player1Id,
        outcome1,
        delta1,
        p1Elo,
        xp1,
        xpBreakdown1,
        rewards1,
      ),
    );
    send(
      p2Ws,
      buildResult(
        player2Id,
        outcome2,
        delta2,
        p2Elo,
        xp2,
        xpBreakdown2,
        rewards2,
      ),
    );
  } catch (err) {
    console.error(`[Resolver] Error resolving match ${matchId}:`, err);
  } finally {
    // Clean up after a delay so players can receive the result
    setTimeout(() => deleteMatch(matchId), 10_000);
  }
}
