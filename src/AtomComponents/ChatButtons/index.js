import React from "react";
import "./styles.css";

const ChatButton = ({ Icon, onClick, flip }) => {
  return (
    <button className="chat-button" onClick={onClick} >
      {Icon}
    </button>
  );
};

export default ChatButton;
