import { WebSocketServer } from "ws";
import { handleConnection } from "./handlers/connection.handler.js";

// Global map to track all connected clients: userId => WebSocket
export const clients = new Map();

export function initWebSocketServer(httpServer) {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on("connection", (ws) => {
    handleConnection(ws, clients);
  });

  console.log("[WS] WebSocket server initialized on the same port as Express.");
}
