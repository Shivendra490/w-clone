import React, { useState } from "react";
import "./Wcomp.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useChatMsgContext } from "../Providers/ChatMsgProvider/context";
import UserSingleComponent from "./UserSingleComponent";

const Wcomp = () => {
  const [inputMsg, SetInputMsg] = useState("");
  const { sendMsg,chatMessages } = useChatMsgContext();
  

  const submitHandler = () => {
    sendMsg(inputMsg);
  };

  return (
    <div className="left-right-wrapper">
      <div className="left">
        <div className="chatHeadingWrapper">
          <div>chat</div>
          {/* <div>+</div>
          <div>set</div> */}
        </div>

        <input type="search" className="search" placeholder="search here" />
        <div style={{padding:'10px'}}>
          {chatMessages.map((curMsg) => {
            return (
              <>
                <UserSingleComponent user={curMsg} />
              </>
            );
          })}
        </div>
      </div>

      <div className="right">
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
        <div className="chatWrapper">
          <span className="chat">hh</span>
          <span className="chat">ygdfuhu</span>
        </div>

        <div className="chatInputWrapper">
          <input
            type="text"
            className="chatInput"
            placeholder="Enter your message here"
            value={inputMsg}
            onChange={(e) => SetInputMsg(e.target.value)}
          />
          <div className="button">
            <button
              style={{ width: "100%", height: "100%" }}
              onClick={submitHandler}
            >
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wcomp;
