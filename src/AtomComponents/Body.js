import React, { useEffect } from "react";

import { milliToStandardTime } from "../api/Chat/TimeManipulate";
import { getUserDetails } from "../api/LocalStorage";
import TickStatus from "./TickStatus";
import useElementOnScreen from "../Hooks/IOHook";
import { CircularProgress } from "@mui/material";

const Body = ({ chatMessages, currentUserId }) => {
  const userSenderId = getUserDetails().userId;

  const { isVisible, containerRef } = useElementOnScreen();

  useEffect(() => {
    isVisible && console.log("fetchapi calling");
  }, [isVisible]);

  console.log(isVisible);

  return (
    <div className="chatWrapper">
      <div className="chatLeftRightwrapper">
        {currentUserId &&
          chatMessages[currentUserId] &&
          chatMessages[currentUserId].map((singleMsg) => {
            return (
              <div
                className={`chat ${
                  singleMsg.senderId === userSenderId ? "chatRight" : ""
                }`}
              >
                <span>{singleMsg.message}</span>
                <div className="tickTimeWrapper">
                  <span>{milliToStandardTime(singleMsg.createdAt)}</span>
                  {singleMsg.senderId === userSenderId && (
                    <span className="rightDoubleTick">
                      {<TickStatus status={singleMsg.status} />}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

        <div
          ref={containerRef}
          style={{ width: "100%", height: "100px", textAlign: "center" }}
        >
          {isVisible && currentUserId && <CircularProgress />}
        </div>
      </div>
    </div>
  );
};

export default Body;
