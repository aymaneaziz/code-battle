// ELO calculation using the standard formula.
const K = 32;

function expectedScore(myElo, opponentElo) {
  return 1 / (1 + Math.pow(10, (opponentElo - myElo) / 400));
}

export function calculateEloDelta(elo1, elo2, outcome1) {
  const SCORES = { win: 1, draw: 0.5, loss: 0 };

  const actual1 = SCORES[outcome1];
  const actual2 = 1 - actual1; // symmetric

  const expected1 = expectedScore(elo1, elo2);
  const expected2 = expectedScore(elo2, elo1);

  const delta1 = Math.round(K * (actual1 - expected1));
  const delta2 = Math.round(K * (actual2 - expected2));

  return { delta1, delta2 };
}
