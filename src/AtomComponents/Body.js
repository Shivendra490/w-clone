import React from "react";
import { getUserFromLocalStorage } from "../api/LocalStorage";
import Tick from "./Tick";

const Body = ({ chatMessages, currentUserId }) => {
  //send to parent
  const id = getUserFromLocalStorage().userId;
  return (
    <div className="chatWrapper">
      <div className="chatLeftRightwrapper">
        {currentUserId && chatMessages[currentUserId].map((msg) => {
          return (
            <div
              className={`chat ${msg.senderId === id && "chatRight"}`}
              key={msg.msgId}
            >
              <span>{msg.message}</span>
              <div className="tickTimeWrapper">
                <span>
                  {new Date(msg.createdAt).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </span>
                <span className="rightDoubleTick">
                  {msg.senderId === id && <Tick status={msg.status} />}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
