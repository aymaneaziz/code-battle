import { enqueue, dequeue, isQueued } from "./queue.js";
import { findBestMatch, confirmMatch } from "./matchmaker.js";
import { getPlayerProfile } from "../services/playerService.js";
import { getMatchProblem } from "../services/matchProblemService.js";
import { createMatch } from "../match/match.state.js";

// Utility function to send JSON messages safely
function send(ws, payload) {
  if (ws.readyState === 1) {
    // 1 = OPEN
    ws.send(JSON.stringify(payload));
  }
}

export const activeMatches = new Map();

export function handleJoinQueue(ws, data, clients) {
  const { userId, displayName, elo } = data;

  if (!userId || !displayName || typeof elo !== "number") {
    return send(ws, { type: "ERROR", message: "Invalid queue payload." });
  }

  if (isQueued(userId)) {
    return send(ws, { type: "ERROR", message: "Already in queue." });
  }

  // Add player to queue
  enqueue(userId, { ws, userId, displayName, elo });

  send(ws, {
    type: "QUEUED",
    message: "You have entered the queue. Searching for match...",
  });

  console.log(`[Matchmaking] ${displayName} (ELO: ${elo}) joined the queue.`);

  // After every new join, attempt to find a match
  attemptMatch(clients).catch((err) =>
    console.error("[Matchmaking] attemptMatch error:", err),
  );
}

export function handleLeaveQueue(ws, data) {
  const { userId } = data;
  if (userId) {
    dequeue(userId);
    send(ws, { type: "LEFT_QUEUE", message: "You have left the queue." });
    console.log(`[Matchmaking] ${userId} left the queue.`);
  }
}

async function attemptMatch() {
  const pair = findBestMatch();
  if (!pair) return; // No match found yet

  const { matchId, player1, player2 } = confirmMatch(
    pair.player1,
    pair.player2,
  );

  console.log(
    `[Matchmaking] Match found! ${player1.displayName} vs ${player2.displayName} | ID: ${matchId}`,
  );

  if (player1.ws.readyState !== 1 || player2.ws.readyState !== 1) {
    console.warn(
      "[Matchmaking] A player disconnected before match was confirmed.",
    );
    // to verify if  is still connected
    if (player1.ws.readyState === 1) enqueue(player1.userId, player1);
    if (player2.ws.readyState === 1) enqueue(player2.userId, player2);
    return;
  }

  // Store the mapping so we can find the opponent by the disconnected user's ID
  activeMatches.set(player1.userId, {
    opponentWs: player2.ws,
    opponentId: player2.userId,
    matchId,
  });
  activeMatches.set(player2.userId, {
    opponentWs: player1.ws,
    opponentId: player1.userId,
    matchId,
  });

  // Fetch full profiles from DB — Option B
  const [profile1, profile2, problem] = await Promise.all([
    getPlayerProfile(player1.userId),
    getPlayerProfile(player2.userId),
    getMatchProblem(),
  ]);

  // ── Create in-memory match state ─────────────────────────────────────────
  createMatch({
    matchId,
    player1Id: player1.userId,
    player2Id: player2.userId,
    problem,
  });
  // Build the opponent object for each player.
  const buildOpponent = (profile, fallback) => ({
    userId: fallback.userId, // Daroriya l surrender
    displayName: profile?.displayName ?? fallback.displayName,
    selectedAvatar: profile?.selectedAvatar ?? null,
    rank: profile?.rank ?? null,
    badgesPlayer: profile?.badgesPlayer ?? [],
    stats: profile?.stats ?? null,
  });

  const p1Payload = {
    type: "MATCH_FOUND",
    matchId,
    you: profile1,
    opponent: buildOpponent(profile2, player2),
    problem,
  };
  const p2Payload = {
    type: "MATCH_FOUND",
    matchId,
    you: profile2,
    opponent: buildOpponent(profile1, player1),
    problem,
  };

  send(player1.ws, p1Payload);
  send(player2.ws, p2Payload);
}
