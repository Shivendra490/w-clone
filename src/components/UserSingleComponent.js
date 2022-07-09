import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const UserSingleComponent = ({user}) => {
  return (

    <div className="mainCompWrapper">
      <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
        <Avatar>{user.pic}</Avatar>
      </Stack>
      <div className="nameChatCombineWrapper">
        <div className="name">
          <h4>{user.name}</h4>
        </div>
        <div className="chat">{user.chat}</div>
      </div>
      <div className="time">{user.time}</div>
      </div>

  );
};

export default UserSingleComponent;
