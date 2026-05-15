import { dequeue } from "../matchmaking/queue.js";
import {
  handleJoinQueue,
  handleLeaveQueue,
  activeMatches,
} from "../matchmaking/matchmaking.handler.js";

function send(ws, payload) {
  if (ws && ws.readyState === 1) {
    ws.send(JSON.stringify(payload));
  }
}
// Handles new WebSocket connections and sets up message routing and cleanup.
export function handleConnection(ws, clients) {
  let connectedUserId = null; // luserId li mconnecta bih, bash n3rfou f message handler w f disconnect

  console.log("[WS] New client connected.");

  // message handler: kayroutei messages 3la handlers dyal matchmaking
  ws.on("message", (raw) => {
    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      send(ws, { type: "ERROR", message: "Invalid JSON." });
      return;
    }

    // ila ja message fih userId w ma kaynach mconnecta bih, nregisteriw had client f clients map
    if (data.userId && !connectedUserId) {
      connectedUserId = data.userId;
      clients.set(connectedUserId, ws);
      console.log(`[WS] Registered client: ${connectedUserId}`);
    }

    // Route to the correct handler based on message type
    switch (data.type) {
      case "INIT":
        // Just a heartbeat to trigger the registration logic above
        break;
      case "JOIN_QUEUE":
        handleJoinQueue(ws, data, clients);
        break;

      case "LEAVE_QUEUE":
        handleLeaveQueue(ws, data);
        break;

      case "SURRENDER": {
        const { matchId, userId, opponentId } = data;
        const opponentWs = clients.get(opponentId);

        if (opponentWs) {
          send(opponentWs, {
            type: "OPPONENT_SURRENDERED",
            matchId: matchId,
            message: "Your opponent has surrendered.",
          });
        }

        if (activeMatches) {
          activeMatches.delete(userId);
          activeMatches.delete(opponentId);
        }
        console.log(`[Match] User ${userId} surrendered in ${matchId}`);
        break;
      }
      default:
        send(ws, {
          type: "ERROR",
          message: `Unknown type: ${data.type}`,
        });
    }
  });

  // ── Cleanup on Disconnect ────────────────────────────────────────
  ws.on("close", () => {
    if (connectedUserId) {
      console.log(`[WS] Client disconnected: ${connectedUserId}`);
      clients.delete(connectedUserId);
      dequeue(connectedUserId);

      if (activeMatches && activeMatches.has(connectedUserId)) {
        const match = activeMatches.get(connectedUserId);

        console.log(
          `[Protection] User ${connectedUserId} dropped. Notifying opponent: ${match.opponentId}`,
        );

        // Notify the opponent that the connection was lost
        const opponentWs = clients.get(match.opponentId);
        if (opponentWs) {
          send(opponentWs, {
            type: "OPPONENT_SURRENDERED",
            matchId: match.matchId,
            message: "Opponent lost connection.",
            wasDisconnect: true,
          });
        }

        // Clean up the match tracking
        activeMatches.delete(connectedUserId);
        activeMatches.delete(match.opponentId);
      }
    }
  });

  ws.on("error", (err) => {
    console.error("[WS] Socket error:", err.message);
  });
}
