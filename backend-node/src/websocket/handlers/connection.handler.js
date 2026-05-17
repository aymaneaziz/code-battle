import { dequeue } from "../matchmaking/queue.js";
import {
  handleJoinQueue,
  handleLeaveQueue,
  activeMatches,
} from "../matchmaking/matchmaking.handler.js";
import { handleSubmitCode, handleTimeExpired } from "../match/match.handler.js";
import { resolveMatch } from "../match/match.resolver.js";
import { getMatch } from "../match/match.state.js";

function send(ws, payload) {
  if (ws && ws.readyState === 1) {
    ws.send(JSON.stringify(payload));
  }
}

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

        const match = getMatch(matchId);
        if (match && !match.resolved) {
          resolveMatch(matchId, opponentId, userId, "surrender", clients).catch(
            (err) => console.error("[WS] SURRENDER resolve error:", err),
          );
        }

        if (activeMatches) {
          activeMatches.delete(userId);
          activeMatches.delete(opponentId);
        }
        console.log(`[Match] User ${userId} surrendered in ${matchId}`);
        break;
      }
      case "SUBMIT_CODE":
        handleSubmitCode(ws, data, clients).catch((err) =>
          console.error("[WS] SUBMIT_CODE error:", err),
        );
        break;

      case "TIME_EXPIRED":
        handleTimeExpired(data, clients).catch((err) =>
          console.error("[WS] TIME_EXPIRED error:", err),
        );
        break;

      default:
        send(ws, {
          type: "ERROR",
          message: `Unknown type: ${data.type}`,
        });
    }
  });

  // ── Cleanup on Disconnect ────────────────────────────────────────
  ws.on("close", () => {
    if (!connectedUserId) return;

    console.log(`[WS] Client disconnected: ${connectedUserId}`);
    clients.delete(connectedUserId);
    dequeue(connectedUserId);

    if (activeMatches?.has(connectedUserId)) {
      const { matchId, opponentId } = activeMatches.get(connectedUserId);

      const match = getMatch(matchId);
      if (match && !match.resolved) {
        resolveMatch(
          matchId,
          opponentId,
          connectedUserId,
          "surrender",
          clients,
        ).catch((err) => console.error("[WS] Disconnect resolve error:", err));
      }

      activeMatches.delete(connectedUserId);
      activeMatches.delete(opponentId);
    }
  });

  ws.on("error", (err) => {
    console.error("[WS] Socket error:", err.message);
  });
}
