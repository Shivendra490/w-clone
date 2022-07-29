import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { getUserFromLocalStorage } from "../../../../../../api/LocalStorage";
import Tick from "../../../../../../AtomComponents/Tick";
import useElementOnScreen from "../../../../../../Hooks/ioHook";
import { dateFormatterForRightSide } from "../../../../../../utils/dateFormatter";

const Body = ({ chatMessages, currentUserId, loading, fetchRoomById }) => {
  const { containerRef, isVisible } = useElementOnScreen();
  const id = getUserFromLocalStorage().userId;

  const showDate = (index) => {
    return dateFormatterForRightSide(
      chatMessages[currentUserId][index].createdAt, // current value
      chatMessages[currentUserId][index + 1]?.createdAt // next value
    );
  };

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
          chatMessages[currentUserId].map((msg, index) => {
            return (
              <>
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
                {showDate(index) && (
                  <span
                    style={{
                      alignSelf: "center",
                      margin: "10px 0px",
                      border: "1px solid",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {showDate(index)}
                  </span>
                )}
              </>
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
