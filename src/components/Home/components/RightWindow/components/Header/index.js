import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ currentUser, toggleDrawer, isMobile }) => {
  return (
    <div className="topDetailsWrapper">
      {currentUser.userId && (
        <>
          <div>
            {isMobile && <MenuIcon onClick={toggleDrawer} />}
            <div className="userNameOnlineWrapper">
              <div className="userName">
                <span>{currentUser.username}</span>
              </div>
              <div className="onOff">
                {(currentUser.typing || currentUser.online) &&
                currentUser.typing ? (
                  <span>typing... </span>
                ) : (
                  <span>{currentUser.online && "online"} </span>
                )}
              </div>
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
