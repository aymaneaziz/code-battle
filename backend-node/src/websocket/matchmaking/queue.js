// Key   → userId (string)
// Value → { ws, username, elo, joinedAt etc... }
const queue = new Map();

export function enqueue(userId, playerData) {
  queue.set(userId, { ...playerData, userId, joinedAt: Date.now() });
}

export function dequeue(userId) {
  queue.delete(userId);
}

export function isQueued(userId) {
  return queue.has(userId);
}

export function getQueue() {
  return Array.from(queue.values());
}
