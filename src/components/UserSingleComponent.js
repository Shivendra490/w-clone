import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useChatMsgContext } from "../Providers/ChatMsgProvider/context";

const UserSingleComponent = ({data}) => {
  // send to parent
  const {getRoomMsgById} = useChatMsgContext();
  console.log(data);
  return (

    <div className="mainCompWrapper" onClick={()=>getRoomMsgById(data.userDetails)}>
      <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
        <Avatar>{data.userDetails.username.substring(0,1)}</Avatar>
      </Stack>
      <div className="nameChatCombineWrapper">
        <div className="name">
          <h4>{data.userDetails.username}</h4>
        </div>
        <div className="chat">{data.message}</div>
      </div>
      <div className="time">{ new Date(data.createdAt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
      </div>

  );
};

export default UserSingleComponent;
