import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styled from "styled-components";
import { BiSend } from "react-icons/bi";
import { colors } from "../config/styles";

const ChatOuter = styled.div`
  box-shadow: 20px 20px 60px #babfc9, -20px -20px 60px #fcffff;
  border-radius: 10px;
  width: 100%;
  max-height: 400px;
  background-color: #24b0ea;
`;
const ChatBodyMessage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
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
    & .messageBubble {
      position: relative;
      z-index: 2;
      background: ${colors.meMessageBubble};
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e7e5e8",endColorstr="#e7e5e8",GradientType=1);
      &::before {
        content: "";
        left: -7px;
        width: 20px;
        background: ${colors.meMessageBubble};
        border-bottom-right-radius: 16px 14px;
        z-index: -1;
        position: absolute;
      }
      &::after {
        content: "";
        left: -8px;
        width: 8px;
        background: #dbe1ed;
        border-bottom-right-radius: 10px;
        z-index: -1;
        position: absolute;
      }
    }
  }
  &#other {
    text-align: left;
    display: flex;
    align-items: flex-end;
    & .messageSet {
      position: relative;
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
        right: -8px;
        width: 8px;
        background: #dbe1ed;
        border-bottom-left-radius: 10px;
      }
      & .showIt {
        position: absolute;
        bottom: 0;
      }
    }
  }
  & .messageDetails {
    display: none;
    gap: 10px;
    font-size: 14px;
    font-weight: 700;
    color: #24b0ea;
    &.showIt {
      display: flex;
    }
  }
`;
const ChatHeader = styled.div`
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  padding: 10px;
`;
const ChatBody = styled.div`
  background-color: #dbe1ed;
  border-radius: 30px 30px 0 0;
  width: 100%;
  height: 300px;
  overflow-x: hidden;
  & .chatContainer {
    height: 100%;
    & button {
      background-color: #24b0ea;
    }
    & button::after {
      display: flex;
      justify-content: center;
      align-items: center;
      border-style: solid;
      border-width: 2px 2px 0 0;
      content: "";
      display: inline-block;
      height: 6px;
      position: relative;
      top: 3px;
      transform: rotate(135deg);
      vertical-align: top;
      width: 6px;
      color: #ffffff;
    }
  }
`;
const ChatFooter = styled.div`
  display: flex;
  height: 50px;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  & input {
    width: 80%;
    border: none;
    padding: 10px;
    height: 100%;
    outline: none;
  }
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 20%;
    height: 100%;
    border: none;
    outline: none;
    transition: all 0.3s ease;
  }
  & button:hover {
    -webkit-box-shadow: inset -4px 0px 56px -34px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: inset -4px 0px 56px -34px rgba(0, 0, 0, 0.75);
    box-shadow: inset -4px 0px 56px -34px rgba(0, 0, 0, 0.75);
  }
`;

const ChatWindow = ({ socket, username, other }) => {
  const [currentMessage, setCurrentMessage] = useState(""); // Keep track of current message
  const [messageList, setMessageList] = useState([]);
  const [clicked, setClicked] = useState(false);

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
          (new Date(Date.now()).getMinutes() < 10 ? "0" : "") +
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
                <p
                  className="messageBubble"
                  onClick={() => setClicked(!clicked)}
                >
                  {item.message}
                </p>
                <div
                  className={`messageDetails ${clicked ? `showIt` : `asdf`}`}
                >
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
        <button onClick={sendMessage}>
          <BiSend size={25} color="#24b0ea" />
        </button>
      </ChatFooter>
    </ChatOuter>
  );
};

export default ChatWindow;
