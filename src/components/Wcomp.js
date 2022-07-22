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


import { grey } from "@mui/material/colors";
import { findUser } from "../api/Chat";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import UnitSearchedComponent from "./UnitSearchedComponent";
import ModalChilds from "./ModalChilds";

// const chatData = [
  
// ];

const Wcomp = () => {
  const [inputMsg, SetInputMsg] = useState("");
  const { sendMsg, chatMessages ,lastMessages,fetchRoomId,currentUser} = useChatMsgContext();
  const [open, setOpen] = useState(false);
  const [inputUser, setInputUser] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const handleUserSingleComponent=(userDetails)=>{
    
    fetchRoomId(userDetails)
    

  }
  

  const submitHandler = () => {
    sendMsg(inputMsg);
    SetInputMsg("");
    
    
  
  };

  const handleChangeFindUser = async (e) => {
    const { value } = e.target;
    if (value.length>10){
      return
    }
    setInputUser(value);

    
    if (value && value.length === 10) {
      
        const response = await findUser(value);

        if (response && response.status === "success") {
          console.log(response, "hfjdhksdfksfsdflsdfflsjfjjk");
          setSearchResult(response);
        } else {
          setSearchResult(response);
        }
      
    } else {
      setSearchResult("");
    }
  };

  const handleChatClick = () => {
    setOpen(true);
  };

  const dismissModal = () => {
    setOpen(false);
  };

  // console.log(chatMessages[currentUser.userId],'chatjfsdlkslkjfjjjjjjjjjjjjjj');
  // console.log(lastMessages,'@@@@@@@@@')

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
          {lastMessages.map((curMsg) => {
            return (
              <>
                <UserSingleComponent user={curMsg} onClick={handleUserSingleComponent} />
              </>
            );
          })}
        </div>
      </div>
      <Modal open={open}>
        <ModalChilds dismissModal={dismissModal} handleChangeFindUser={handleChangeFindUser} inputUser={inputUser} searchResult={searchResult}/>
      </Modal>
      <div className="right">
        <Header currentUser={currentUser}/>
        <Body chatMessages={chatMessages} currentUserId={currentUser.userId}/>

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
