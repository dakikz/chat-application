import io from "socket.io-client";
import { useState } from "react";
import styled from "styled-components";
import ChatWindow from "./components/ChatWindow";

const socket = io.connect("http://localhost:3010");

const AppOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dbe1ed;
  width: 100%;
  min-height: 100vh;
  border: 3px solid purple;
  padding: 40px;
`;
const ChatSection = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  padding: 10px;
  border: 1px solid blue;
`;
const ChatLogin = styled.div`
  text-align: center;
  background-color: #dbe1ed;
  padding: 30px;
  border-radius: 50px;
  box-shadow: 20px 20px 60px #babfc9, -20px -20px 60px #fcffff;
  & h1 {
    margin-bottom: 20px;
    font-size: 30px;
  }
`;

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
              onKeyPress={(event) => {
                event.key === "Enter" && joinChat();
              }}
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
