import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ChatOuter = styled.div`
  border: 1px solid green;
`;
const ChatHeader = styled.div``;
const ChatBody = styled.div``;
const ChatFooter = styled.div``;

const ChatWindow = ({ socket, username }) => {
  const [currentMessage, setCurrentMessage] = useState(""); // Keep track of current message

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
    }
  };
  // Listen to any changes on the socket server
  useEffect(() => {
    socket.on("receivedMessage", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <ChatOuter>
      <ChatHeader>Header</ChatHeader>
      <ChatBody>Body</ChatBody>
      <ChatFooter>
        <input
          type="text"
          placeholder="Type a message..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </ChatFooter>
    </ChatOuter>
  );
};

export default ChatWindow;
