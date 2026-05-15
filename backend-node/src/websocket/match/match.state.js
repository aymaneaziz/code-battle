const matches = new Map();

export function createMatch({ matchId, player1Id, player2Id, problem }) {
  const playerState = () => ({
    hp: 100,
    combo: 0,
    submissions: 0,
    testsPassed: 0,
    failedSubs: 0,
    finishedAt: null,
  });

  matches.set(matchId, {
    matchId,
    player1Id,
    player2Id,
    problem,
    players: {
      [player1Id]: playerState(),
      [player2Id]: playerState(),
    },
    startedAt: Date.now(),
    resolved: false,
  });

  console.log(
    `[MatchState] Created match ${matchId} (${player1Id} vs ${player2Id})`,
  );
}

export function getMatch(matchId) {
  return matches.get(matchId) ?? null;
}

export function getMatchByUserId(userId) {
  for (const match of matches.values()) {
    if (match.player1Id === userId || match.player2Id === userId) {
      return match;
    }
  }
  return null;
}

export function getPlayerState(matchId, userId) {
  return matches.get(matchId)?.players[userId] ?? null;
}

export function updatePlayerState(matchId, userId, updates) {
  const match = matches.get(matchId);
  if (!match || !match.players[userId]) return;
  Object.assign(match.players[userId], updates);
}

export function markResolved(matchId) {
  const match = matches.get(matchId);
  if (match) match.resolved = true;
}

export function deleteMatch(matchId) {
  matches.delete(matchId);
  console.log(`[MatchState] Deleted match ${matchId}`);
}

export function getOpponentId(matchId, userId) {
  const match = matches.get(matchId);
  if (!match) return null;
  if (match.player1Id === userId) return match.player2Id;
  if (match.player2Id === userId) return match.player1Id;
  return null;
}
