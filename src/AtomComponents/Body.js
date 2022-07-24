import { CircularProgress } from "@mui/material";
import React from "react";
import { getUserFromLocalStorage } from "../api/LocalStorage";
import useElementOnScreen from "../Hooks/ioHook";
import Tick from "./Tick";

const Body = ({ chatMessages, currentUserId }) => {
  const { containerRef, isVisible } = useElementOnScreen();
  const id = getUserFromLocalStorage().userId;
  return (
    <div className="chatWrapper">
      <div className="chatLeftRightwrapper">
        {currentUserId &&
          chatMessages[currentUserId] &&
          chatMessages[currentUserId].map((msg) => {
            return (
              <div
                className={`chat ${msg.senderId === id && "chatRight"}`}
                key={msg.msgId}
              >
                <span>{msg.message}</span>
                <div className="tickTimeWrapper">
                  <span>
                    {new Date(msg.createdAt)
                      .toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })
                      .toLocaleLowerCase()}
                  </span>
                  <span className="rightDoubleTick">
                    {msg.senderId === id && <Tick status={msg.status} />}
                  </span>
                </div>
              </div>
            );
          })}
        <div
          style={{
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
          ref={containerRef}
        >
          <CircularProgress />
        </div>
      </div>
    </div>
  );
};

export default Body;
