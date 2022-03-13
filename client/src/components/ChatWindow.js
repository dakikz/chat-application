import React from "react";
import styled from "styled-components";

const ChatOuter = styled.div`
  border: 1px solid green;
`;
const ChatHeader = styled.div``;
const ChatBody = styled.div``;
const ChatFooter = styled.div``;

const ChatWindow = ({ socket, username }) => {
  return (
    <ChatOuter>
      <ChatHeader>Header</ChatHeader>
      <ChatBody>Body</ChatBody>
      <ChatFooter>Footer</ChatFooter>
    </ChatOuter>
  );
};

export default ChatWindow;
