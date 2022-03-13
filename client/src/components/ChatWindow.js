import React, { useState } from "react";
import styled from "styled-components";

const ChatOuter = styled.div`
  border: 1px solid green;
`;
const ChatHeader = styled.div``;
const ChatBody = styled.div``;
const ChatFooter = styled.div``;

const ChatWindow = ({ socket, username }) => {
  const [currentMessage, setCurrentMessage] = useState(""); // Keep track of current message

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
        <button>Send</button>
      </ChatFooter>
    </ChatOuter>
  );
};

export default ChatWindow;
