// import the websocket library and other dependencies
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");
const url = require("url");
const { connect } = require("http2");

// Créer application Express
const app = express();
app.use(express.json());
app.use(cors());

// create an http server and a websocket server, and listen for incoming connections
const server = http.createServer(); // create an http server
const wss = new WebSocket.Server({ server }); // create a websocket server and attach it to the http server
const port = 5000;

// Chemin vers les fichiers de données
const messagesPath = path.join(__dirname, "Data", "messages.json");
const databasePath = path.join(__dirname, "Data", "DataBase.json");
let users = [];
let connections = [];

// Charger les données depuis les fichiers JSON
const loadData = async () => {
  const data = await fs.readFile(databasePath, "utf-8");
  return JSON.parse(data);
};

(async () => {
  users = await loadData();
})();

// Fonction pour écrire un message dans le fichier JSON
const writeMessage = async (message) => {
  const data = await fs.readFile(messagesPath, "utf-8");
  const messages = JSON.parse(data);
  messages.push(message);
  await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2));
};

const loadMessages = async (id, targetUser) => {
  const data = await fs.readFile(messagesPath, "utf-8");
  const messages = JSON.parse(data);
  const userMessages = messages.filter(
    (msg) =>
      (msg.sender === id && msg.receiver === targetUser.id) ||
      (msg.sender === targetUser.id && msg.receiver === id)
  );
  return userMessages;
};

// ***************************Route express***************************
app.get("/", (req, res) => {
  res.send("Backend fonctionne");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const account = users.find(
    (acc) => acc.username === username && acc.password === password
  );

  if (account) {
    res.status(200).json({
      user: account,
      message: "Login successful",
    });
  } else {
    res.status(401).json({
      message: "Login failed",
    });
  }
});

const handleMessage = async (message, id) => {
  const data = JSON.parse(message);
  console.log("Received message:", data);
  if (data.data) {
    if (data.name === "openChat") {
      return await importHistory(data, id);
    }
    if (data.name === "message") {
      return await Chat(data, id);
    }
  }
};

const importHistory = async (data, id) => {
  const targetUser = users.find((user) => user.username === data.data.username);
  if (targetUser) {
    console.log(`Chat opened between ${id} and ${targetUser.id}`);
    const messages = await loadMessages(id, targetUser);
    return {
      name: "chatMessages",
      data: messages,
      isImport: true,
    };
  } else {
    console.log(`User ${data.data.username} not found`);
  }
};

const Chat = async (data, id) => {
  await writeMessage({
    sender: id,
    receiver: data.data.targetUser.id,
    content: data.data.msg,
  });
  const messages = await loadMessages(id, data.data.targetUser);
  return {
    name: "chatMessages",
    data: messages,
    isImport: false,
    receiver: data.data.targetUser.id,
  };
};

const broadCast = (messages, id) => {
  connections[id].send(JSON.stringify(messages));
  console.log("this", messages);
  if (!messages.isImport) {
    connections[messages.receiver].send(JSON.stringify(messages));
  }
};

// ***************************webSocket***************************
wss.on("connection", (connection, request) => {
  const myUrl = new URL(request.url, `http://${request.headers.host}`);
  const id = myUrl.searchParams.get("id");
  const username = users.find((user) => user.id === id)?.username || "Unknown";

  connections[id] = connection;
  console.log(`${username} connected`);

  connection.send(
    JSON.stringify({
      name: "Users",
      users,
    })
  );

  connection.on("message", async (message) => {
    const messages = await handleMessage(message, id);
    messages && broadCast(messages, id);
  });

  // Quand client quitte
  connection.on("close", () => {
    console.log(`${username}  déconnecté`);
  });
});

// Lancer serveur sur port 5000
server.listen(port, () => {
  console.log("Serveur lancé sur port 5000");
});

app.listen(8000, () => {
  console.log(`Serveur Express lancé sur le port 8000`);
});
