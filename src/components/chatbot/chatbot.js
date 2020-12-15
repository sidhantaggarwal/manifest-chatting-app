import React from "react";
import "./chatbot.css";
const ChatBot = props => {
  return (
    <div style={{ display: "flex", width: "85%" }}>
      <p className="user-text">{props.message}</p>
    </div>
  );
};

export default ChatBot;
