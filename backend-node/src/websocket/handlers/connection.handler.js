import { dequeue } from "../matchmaking/queue.js";
import {
  handleJoinQueue,
  handleLeaveQueue,
} from "../matchmaking/matchmaking.handler.js";

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
      ws.send(JSON.stringify({ type: "ERROR", message: "Invalid JSON." }));
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
          opponentWs.send(
            JSON.stringify({
              type: "OPPONENT_SURRENDERED",
              message: "Your opponent has surrendered",
            }),
          );
        }
        console.log(`[Match] User ${userId} surrendered in ${matchId}`);
        break;
      }
      default:
        ws.send(
          JSON.stringify({
            type: "ERROR",
            message: `Unknown type: ${data.type}`,
          }),
        );
    }
  });

  // ── Cleanup on Disconnect ────────────────────────────────────────
  ws.on("close", () => {
    if (connectedUserId) {
      clients.delete(connectedUserId);
      dequeue(connectedUserId);
      console.log(`[WS] Client disconnected: ${connectedUserId}`);
    }
  });

  ws.on("error", (err) => {
    console.error("[WS] Socket error:", err.message);
  });
}
