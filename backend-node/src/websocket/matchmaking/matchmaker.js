import { getQueue, dequeue } from "./queue.js";

// hada limit dyal ELO li kayn f matchmaking, ila kan difference kbir 3lih bin player1 w player2, ma kaytmatchiwch
const ELO_THRESHOLD = 2000;

// logic dyal matchmaking
export function findBestMatch() {
  const players = getQueue();

  if (players.length < 2) return null;

  let bestPair = null;
  let smallestDiff = Infinity;

  // ncompare every player with every other player to find the closest ELO match
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const diff = Math.abs(players[i].elo - players[j].elo);

      if (diff < smallestDiff) {
        smallestDiff = diff;
        bestPair = { player1: players[i], player2: players[j] };
      }
    }
  }

  // kanconfirmiw match ila kan difference f ELO ma kbirch mn threshold
  if (bestPair && smallestDiff <= ELO_THRESHOLD) {
    return bestPair;
  }

  return null;
}

// hadi function li katconfirmi match, katdequeue players mn queue w katgenerate matchId unique
export function confirmMatch(player1, player2) {
  dequeue(player1.userId);
  dequeue(player2.userId);

  const matchId = `match_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return { matchId, player1, player2 };
}
