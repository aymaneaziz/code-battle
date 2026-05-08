import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WebSocketModule from "react-use-websocket";

function Chat() {
  const routeParams = useParams();
  const [id, setId] = useState(routeParams.id);
  const useWebSocket = WebSocketModule.default;
  const wsUrl = "ws://localhost:5000";
  const { sendJsonMessage } = useWebSocket(wsUrl, {
    queryParams: { id },
    onMessage: (event) => {
      console.log("Message reçu du serveur :", event.data);
      const data = JSON.parse(event.data);

      if (data.name === "Users") {
        setUsers(data.users);
      }
      if (data.name === "chatMessages" && data.data) {
        setMessages(data.data);
      }
    },
  });

  const [username, setUsername] = useState(routeParams.username);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [targetUser, setTargetUser] = useState(null);

  const handleClick = (event) => {
    const username = JSON.parse(event.target.innerText);
    const user = users.find((u) => u.username === username);
    setTargetUser(user);
  };

  useEffect(() => {
    sendJsonMessage({
      name: "openChat",
      data: targetUser,
    });
  }, [targetUser, sendJsonMessage]);

  // Quand page démarre

  // Fonction envoyer message
  const sendMessage = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("message").trim() === "") {
      return;
    }
    sendJsonMessage({
      name: "message",
      data: {
        targetUser,
        username,
        msg: formData.get("message").trim(),
      },
    });
  };

  return (
    <div className="chat-page">
      <div className="users">
        <h2>Utilisateurs disponibles</h2>
        {users && (
          <ul className="users-list">
            {users.map(
              (user) =>
                user.id !== id && (
                  <li key={user.id}>
                    <button onClick={(e) => handleClick(e)}>
                      {JSON.stringify(user.username)}
                    </button>
                  </li>
                )
            )}
          </ul>
        )}
      </div>
      {targetUser && (
        <div className="container">
          <h1>Chat avec {targetUser.username}</h1>

          <div className="chat-box">
            {messages.map((msg, index) => (
              <p key={index} className="message">
                {msg.sender} : {msg.content}
              </p>
            ))}
          </div>

          {/* Zone input */}
          <form onSubmit={(e) => sendMessage(e)} className="input-area">
            <input name="message" type="text" placeholder="Écrire message..." />
            <button type="submit">Envoyer</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
