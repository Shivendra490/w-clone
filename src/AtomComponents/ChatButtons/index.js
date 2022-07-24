import React from "react";
import "./styles.css";

const ChatButton = ({ Icon, onClick, type }) => {
  return (
    <button className="chat-button" onClick={onClick} type={type || "button"}>
      {Icon}
    </button>
  );
};

export default ChatButton;
