import io from "socket.io-client";
import { useState } from "react";
import styled from "styled-components";
import ChatWindow from "./components/ChatWindow";

const socket = io.connect("http://localhost:3010");

const AppOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  width: 100%;
  height: 100vh;
`;
const ChatSection = styled.div``;
const ChatLogin = styled.div``;

function App() {
  // Pass the username to the state
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinChat = () => {
    if (username !== "") {
      socket.emit("joinChat", "chatRoom");
      setShowChat(true);
    }
  };

  return (
    <AppOuter>
      <ChatSection>
        {!showChat ? (
          <ChatLogin>
            <h1>Chat Application</h1>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <button onClick={joinChat}>Join Chat</button>
          </ChatLogin>
        ) : (
          <ChatWindow socket={socket} username={username} />
        )}
      </ChatSection>
    </AppOuter>
  );
}

export default App;
