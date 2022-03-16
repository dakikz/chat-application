import io from "socket.io-client";
import { useState } from "react";
import styled from "styled-components";
import { AiOutlineWechat } from "react-icons/ai";
import ChatWindow from "./components/ChatWindow";
import { videoBg } from "./config/videos";

const socket = io.connect("http://localhost:3010");

const AppOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(219, 225, 237, 0.8);
  width: 100%;
  min-height: 100vh;
  padding: 40px;
`;
const ChatSection = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  padding: 10px;
  z-index: 1;
`;
const ChatLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgb(219, 225, 237);
  padding: 30px 40px 40px;
  width: 100%;
  border-radius: 50px;
  box-shadow: 20px 20px 60px #babfc9, -20px -20px 60px #fcffff;
  & video {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  & .vid::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(219, 225, 237, 0.8);
    z-index: -1;
  }
  & h1 {
    margin-bottom: 5px;
    font-size: 30px;
  }
  & input {
    margin-top: 20px;
    font-weight: 700;
    background-color: #dbe1ed;
    padding: 0 10px;
    border-radius: 20px 0 0 20px;
    border: 0;
    box-shadow: -4px 4px 8px #9d9d9d, 4px -4px 8px #ffffff;
    height: 100%;
    outline: none;
  }
  & button {
    border: 0;
    font-weight: 700;
    height: 100%;
    padding: 0 10px;
    border-radius: 0 20px 20px 0;
    box-shadow: 0 4px 8px #9d9d9d, 0 -4px 8px #ffffff;
    background-color: #cccccc;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  & button:hover {
    background: #e0e0e0;
    box-shadow: inset 0 4px 8px #9d9d9d, inset 0 -4px 8px #ffffff;
  }
  & .joinChat {
    border: none;
    height: 40px;
  }
`;

function App() {
  // Pass the username to the state
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinChat = () => {
    if (username !== "") {
      socket.emit("joinChat", "chatRoom", { user: username });
      socket.emit("joinUser", "chatRoom", { user: username });
      setShowChat(true);
    }
  };

  return (
    <AppOuter>
      <ChatSection>
        {!showChat ? (
          <ChatLogin>
            <div className="vid">
              <video autoPlay loop muted>
                <source src={videoBg} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <h1>Chat Application</h1>
            <AiOutlineWechat size={50} />
            <div className="joinChat">
              <input
                type="text"
                placeholder="Enter your username"
                onChange={(event) => setUsername(event.target.value)}
                onKeyPress={(event) => {
                  event.key === "Enter" && joinChat();
                }}
              />
              <button onClick={joinChat}>Join Chat</button>
            </div>
          </ChatLogin>
        ) : (
          <ChatWindow socket={socket} username={username} />
        )}
      </ChatSection>
    </AppOuter>
  );
}

export default App;
