import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styled from "styled-components";

const ChatOuter = styled.div`
  box-shadow: 20px 20px 60px #babfc9, -20px -20px 60px #fcffff;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  max-height: 400px;
  border: 1px solid orange;
`;
const ChatBodyMessage = styled.div`
  display: flex;
  flex-direction: column;

  &#me {
    border: 1px solid blue;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  &#other {
    border: 1px solid green;
  }
`;
const ChatHeader = styled.div``;
const ChatBody = styled.div`
  border: 4px solid yellow;
  width: 100%;
  height: 300px;
  overflow-x: hidden;
  & .chatContainer {
    height: 100%;
  }
`;
const ChatFooter = styled.div``;

const ChatWindow = ({ socket, username }) => {
  const [currentMessage, setCurrentMessage] = useState(""); // Keep track of current message
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      console.log(currentMessage);
      const messageData = {
        room: "chatRoom",
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("sendMessage", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  // Listen to any changes on the socket server
  useEffect(() => {
    socket.on("receivedMessage", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <ChatOuter>
      <ChatHeader>Chat with:</ChatHeader>
      <ChatBody>
        <ScrollToBottom className="chatContainer">
          {messageList.map((item, idx) => (
            <ChatBodyMessage
              key={idx}
              id={username === item.author ? "me" : "other"}
            >
              <p>{item.message}</p>
              <p>{item.author}</p>
              <p>{item.time}</p>
            </ChatBodyMessage>
          ))}
        </ScrollToBottom>
      </ChatBody>
      <ChatFooter>
        <input
          type="text"
          placeholder="Type a message..."
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </ChatFooter>
    </ChatOuter>
  );
};

export default ChatWindow;
