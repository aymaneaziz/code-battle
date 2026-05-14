const WS_URL = import.meta.env.VITE_WS_URL;

class WebSocketClient {
  constructor() {
    this.ws = null;
    // listeners  wa7d structure li kat5alli lclient y9der yregistera bzf dcallbacks 3la 7sab type dyal message
    this.listeners = {};
    this.userId = null;
    // Reconnect logic
    this._reconnectTimer = null;
    // Intentional close flag to prevent auto-reconnect when we call disconnect()
    this._intentionalClose = false;
  }

  ensureConnected(userId) {
    if (!userId) return;
    this.userId = userId;

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.send({ type: "INIT", userId: this.userId });
      return;
    }
    if (this.ws && this.ws.readyState === WebSocket.CONNECTING) return;
    this.connect();
  }

  connect() {
    if (this.ws && this.ws.readyState <= 1) return; // Already connected or connecting

    this._intentionalClose = false;
    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      console.log("[WS Client] Connected to server.");

      if (this.userId) {
        this.send({ type: "INIT", userId: this.userId });
      }
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // kat9ra type dyal message w kat3ayet lcallbacks li msajlin 3la had type f listeners
        (this.listeners[data.type] || []).forEach((cb) => cb(data));
      } catch {
        console.error("[WS Client] Failed to parse message:", event.data);
      }
    };

    this.ws.onclose = () => {
      console.log("[WS Client] Disconnected.");
      this.ws = null;
      // Only auto-reconnect if this was NOT an intentional disconnect
      if (!this._intentionalClose && this.userId) {
        this._reconnectTimer = setTimeout(() => this.connect(), 5000);
      }
    };

    this.ws.onerror = (err) => {
      console.error("[WS Client] Error:", err);
    };
  }

  send(payload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload));
    } else {
      console.warn("[WS Client] Cannot send — socket not open.");
    }
  }

  on(type, callback) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(callback);
  }

  off(type, callback) {
    if (!this.listeners[type]) return;
    this.listeners[type] = this.listeners[type].filter((cb) => cb !== callback);
  }

  disconnect() {
    this._intentionalClose = true;
    this.userId = null; // flag BEFORE closing
    clearTimeout(this._reconnectTimer);
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

const wsClient = new WebSocketClient();
export default wsClient;
