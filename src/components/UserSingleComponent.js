import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { leftMilliToStandardTime, milliToStandardTime } from "../api/Chat/TimeManipulate";
import TickStatus from '../AtomComponents/TickStatus'
import { getUserDetails } from "../api/LocalStorage";
import Badge from '@mui/material/Badge';

const UserSingleComponent = ({user,onClick}) => {
//   console.log(onClick);
//   const milliToStandardTime=(milliTime)=>{
//     const date = new Date(milliTime);
// const str = date.toLocaleString();
// return str
//   }

console.log(user)
  return (

    <div className="mainCompWrapper" onClick={()=>onClick(user.userDetails)}>
      <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
        <Avatar>{user.userDetails.username[0].toUpperCase()}</Avatar>
      </Stack>
      <div className="nameChatCombineWrapper">
        <div className="name">
          <h4>{user.userDetails.username}</h4>
        </div>
        <div className="chat"><> {user.senderId===getUserDetails().userId && <TickStatus status={user.status}/>}{(user.typing && 'typing')||(user.message)}</></div>
      </div>
      <div className="timeBadgeWrapper" style={{display:'flex',flexDirection:'column',textAlign:'center',color:'green'}}>
      <div className="time">{leftMilliToStandardTime(user.createdAt)}
      <div className="badge">
      <Badge badgeContent={user.unread} color="primary"></Badge>
      </div>
      </div>
      </div>
      
      </div>

  );
};

export default UserSingleComponent;
