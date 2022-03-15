import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styled from "styled-components";
import { colors } from "../config/styles";

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
  & .messageBubble {
    word-break: break-all;
    border-radius: 20px;
    padding: 10px 14px;
    max-width: 300px;
    width: 100%;
    &:before,
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      height: 15px;
    }
  }
  & .messageSet {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin-bottom: 10px;
  }
  &#me {
    display: flex;
    align-items: flex-start;
    margin-left: 10px;
    & .messageBubble {
      position: relative;
      border: 1px solid black;
      z-index: 2;
      background: ${colors.meMessageBubbleBg};
      background: ${colors.meMessageBubble};
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e7e5e8",endColorstr="#e7e5e8",GradientType=1);
      &:before {
        left: -7px;
        width: 20px;
        background: #e7e5e8;
        border-bottom-right-radius: 16px 14px;
        border-bottom: 1px solid black;
        z-index: 1;
      }
      &:after {
        left: -26px;
        width: 26px;
        background: #dbe1ed;
        border-bottom: 1px solid black;
        border-bottom-right-radius: 10px;
        z-index: 1;
      }
    }
  }
  &#other {
    margin-right: 10px;
    text-align: left;
    display: flex;
    align-items: flex-end;
    & .messageSet {
      display: flex;
      align-items: flex-end;
    }
    & .messageBubble {
      position: relative;
      background: ${colors.otherMessageBubbleBg};
      background: ${colors.otherMessageBubble};
      &:before {
        right: -7px;
        width: 20px;
        background: #92d644;
        border-bottom-left-radius: 16px 14px;
      }
      &:after {
        right: -26px;
        width: 26px;
        background: #dbe1ed;
        border-bottom-left-radius: 10px;
      }
    }
  }

  & .messageDetails {
    display: flex;
    gap: 10px;
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
              <div className="messageSet">
                <p className="messageBubble">{item.message}</p>
                <div className="messageDetails">
                  <p>{item.author}</p>
                  <p>{item.time}</p>
                </div>
              </div>
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
