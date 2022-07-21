import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useChatMsgContext } from "../Providers/ChatMsgProvider/context";
import Tick from "../AtomComponents/Tick";
import { getUserFromLocalStorage } from "../api/LocalStorage";
import { Badge } from "@mui/material";

const userId = getUserFromLocalStorage().userId;
const UserSingleComponent = ({ data }) => {
  const { getRoomMsgById } = useChatMsgContext();
  return (
    <div
      className="mainCompWrapper"
      onClick={() => getRoomMsgById(data.userDetails)}
    >
      <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
        <Avatar>{data.userDetails.username.substring(0, 1)}</Avatar>
      </Stack>
      <div className="nameChatCombineWrapper">
        <div className="name">
          <h4>{data.userDetails.username}</h4>
        </div>
        <div className="chat">
          <span>
            {data.senderId === userId && <Tick status={data.status} />}
            {data.userDetails.typing ? "typing..." : data.message}
          </span>
        </div>
      </div>
      <div className="time">
        <span style={{ display: "block" }}>
          {new Date(data.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
        <span>
          <Badge badgeContent={data.unread} color="error" />
        </span>
      </div>
    </div>
  );
};

export default UserSingleComponent;
