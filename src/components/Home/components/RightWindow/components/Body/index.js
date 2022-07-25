import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { getUserFromLocalStorage } from "../../../../../../api/LocalStorage";
import Tick from "../../../../../../AtomComponents/Tick";
import useElementOnScreen from "../../../../../../Hooks/ioHook";

const Body = ({ chatMessages, currentUserId, loading, fetchRoomById }) => {
  const { containerRef, isVisible } = useElementOnScreen();
  const id = getUserFromLocalStorage().userId;
  useEffect(() => {
    if (isVisible && currentUserId) {
      fetchRoomById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, currentUserId]);
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
            height: isVisible ? "50px" : "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            margin: "auto",
          }}
          ref={containerRef}
        >
          {currentUserId && loading && <CircularProgress />}
        </div>
      </div>
    </div>
  );
};

export default Body;
