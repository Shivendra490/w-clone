import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Header = ({ currentUser }) => {
  return (
    <div className="topDetailsWrapper">
      {currentUser.userId && (
        <>
          <div className="userNameOnlineWrapper">
            <div className="userName">
              <span>{currentUser.username}</span>
            </div>
            <div className="onOff">
              {(currentUser.typing || currentUser.online) && (
                <span>
                  {currentUser.typing
                    ? "typing..."
                    : currentUser.online && "online"}
                </span>
              )}
            </div>
          </div>
          <div className="dpWrapper">
            <Stack
              direction="row"
              spacing={2}
              style={{ display: "grid", placeContent: "center" }}
            >
              <Avatar>L</Avatar>
            </Stack>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
