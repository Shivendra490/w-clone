import React from 'react'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Header = ({currentUser}) => {

  return (
    <div className="topDetailsWrapper">
          <div className="userNameOnlineWrapper">
            <div className="userName">{currentUser.username && currentUser.username}</div>
            <div className="onOff">online</div>
          </div>
          <div className="dpWrapper">
            <Stack
              direction="row"
              spacing={2}
              style={{ display: "grid", placeContent: "center" }}
            >
              <Avatar>{currentUser.username && currentUser.username[0].toUpperCase()}</Avatar>
            </Stack>
          </div>
        </div>
  )
}

export default Header