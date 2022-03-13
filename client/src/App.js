import io from "socket.io-client";
import { useState } from "react";
import styled from "styled-components";
import ChatWindow from "./components/ChatWindow";

const socket = io.connect("http://localhost:3010");

const AppOuter = styled.div`
  border: 1px solid red;
`;

function App() {
  const [username, setUsername] = useState("");

  const joinChat = () => {
    if (username !== "") {
      socket.emit("joinChat", "chatRoom");
    }
  };

  return (
    <AppOuter>
      <h1>Chat Application</h1>
      <input
        type="text"
        placeholder="Enter your username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <button onClick={joinChat}>Join Chat</button>
      <ChatWindow socket={socket} username={username} />
    </AppOuter>
  );
}

export default App;
