import React, { useEffect, useState } from "react";
import "./Wcomp.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useChatMsgContext } from "../Providers/ChatMsgProvider/context";
import UserSingleComponent from "./UserSingleComponent";
import Header from "../AtomComponents/Header";
import Body from "../AtomComponents/Body";
import Footer from "../AtomComponents/Footer";
import ChatIcon from "@mui/icons-material/Chat";
import Modal from "@mui/material/Modal";

import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import { findUser } from "../api/Chat";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

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
  {
    pic: "G",
    name: "Gautam",
    chat: "Member of Parliament",
    time: "02:24 AM",
  },
  {
    pic: "G",
    name: "Gautam",
    chat: "Member of Parliament",
    time: "02:24 AM",
  },
  {
    pic: "G",
    name: "Gautam",
    chat: "Member of Parliament",
    time: "02:24 AM",
  },
  {
    pic: "G",
    name: "Gautam",
    chat: "Member of Parliament",
    time: "02:24 AM",
  },
  {
    pic: "G",
    name: "Gautam",
    chat: "Member of Parliament",
    time: "02:24 AM",
  },
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
  const [open, setOpen] = useState(true);
  const [inputUser, setInputUser] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const submitHandler = () => {
    SetInputMsg("");
    sendMsg(inputMsg);
  };

  const handleChangeFindUser = async (e) => {
    const { value } = e.target;
    setInputUser(value);

    if (value) {
      const response = await findUser(value);

      if (response && response.status === "success") {
        setSearchResult(response.data);
      }
    }
  };

  const handleChatClick = () => {
    setOpen(true);
  };

  const dismissModal = () => {
    setOpen(false);
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
        <div
          style={{
            padding: "10px",
            flex: "1 0 0",
            overflowY: "auto",
            position: "relative",
          }}
        >
          <div className="relativeChatWrapper">
            <button className="relativeChatButton" onClick={handleChatClick}>
              <ChatIcon style={{ fill: "white" }} />
            </button>
          </div>
          {chatData.map((curMsg) => {
            return (
              <>
                <UserSingleComponent user={curMsg} />
              </>
            );
          })}
        </div>
      </div>
      <Modal open={open}>
        <div className="childModal">
          <div
            className="cross"
            style={{ width: "100%", display: "grid", justifyContent: "end" }}
          >
            <CloseIcon onClick={dismissModal} />
          </div>
          <div
            className="cardWrapper"
            style={{
              display: "flex",
              width: "100%",
              boxSizing: "border-box",
              flexDirection: "column",
              padding: "0 16px 16px 16px",
              justifyContent: "space-around",
              gap:'25px'
            }}
          >
            <h2 style={{ paddingBottom: "8px" }}>Search Users</h2>
            <input
              type="text"
              placeholder="search here"
              value={inputUser}
              onChange={handleChangeFindUser}
              style={{
                borderRadius: "20px",
                height: "40px",
                width: "100%",
                textAlign: "center",
              }}
            />
            <div
              className="searchedUserWrapper"
              style={{ display: "flex", height: "60px", width: "100%" ,alignItems:'center',justifyContent:'space-between'}}
            >
              <div
                className="userAvatarNameWrapper"
                style={{
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                  
                  padding: "2%",
                  border: "1px solid grey",
                  borderRadius: "10px",
                  maxWidth: "60%",
                }}
              >
                <div className="userAvatar">
                  <Avatar />
                </div>
                <div
                  className="classUserNamePhoneWrapper"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div className="classPhone">
                    <h4>{searchResult.phone}</h4>
                  </div>
                  <div className="classUserName" style={{ color: "grey" }}>
                    <h6
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "90%",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {searchResult.username}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="messageWrite">
               <span><EmailOutlinedIcon/></span>
                
              </div>
            </div>
          
          </div>
        </div>
      </Modal>
      <div className="right">
        <Header />
        <Body />

        <Footer
          submitHandler={submitHandler}
          inputMsg={inputMsg}
          SetInputMsg={SetInputMsg}
        />
      </div>
    </div>
  );
};

export default Wcomp;
