import React from 'react'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Header = () => {
  return (
    <div className="topDetailsWrapper">
          <div className="userNameOnlineWrapper">
            <div className="userName">Alice</div>
            <div className="onOff">online</div>
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
        </div>
  )
}

export default Header