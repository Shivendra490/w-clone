import React, { useState } from "react";
import "./Wcomp.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useChatMsgContext } from "../Providers/ChatMsgProvider/context";
import UserSingleComponent from "./UserSingleComponent";
import Header from "../AtomComponents/Header";
import Body from "../AtomComponents/Body";
import Footer from "../AtomComponents/Footer";

const Wcomp = () => {
  const [inputMsg, SetInputMsg] = useState("");
  const { sendMsg, chatMessages } = useChatMsgContext();

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
        <div style={{ padding: "10px" }}>
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
        <Header />
        <Body />
        <Footer submitHandler={submitHandler} inputMsg={inputMsg} SetInputMsg={SetInputMsg}/>
      </div>
    </div>
  );
};

export default Wcomp;
