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

const chatData = [
  { pic: "A", name: "Amit", chat: "Gud morn", time: "11:28 AM" },
  { pic: "B", name: "Bumrah", chat: "bowling", time: "10:25 PM" },
  { pic: "S", name: "sehwag", chat: "Hey", time: "01:28 AM" },
  {
    pic: "G",
    name: "Gautam",
    chat: "Member of Parliament",
    time: "02:24 AM",
  },
];

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
        <div style={{ padding: '10px',flex: '1 0 0',overflowY: 'auto'}}>
          {chatData.map((curMsg) => {
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
