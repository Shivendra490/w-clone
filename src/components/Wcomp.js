import React, { useState } from "react";
import "./Wcomp.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import { useChatMsgContext } from "../Providers/ChatMsgProvider/context";
import UserSingleComponent from "./UserSingleComponent";
import Header from "../AtomComponents/Header";
import Body from "../AtomComponents/Body";
import Footer from "../AtomComponents/Footer";
import ChatIcon from "@mui/icons-material/Chat";
import { findUser } from "../api/Chat";
import FindUserModal from "./FindUserModal";
import sendMsgAudio from "../assets/Google Notification.mp3";
import { useSound } from "use-sound";

const Wcomp = () => {
  const [play] = useSound(sendMsgAudio);
  const [inputMsg, SetInputMsg] = useState("");
  const { sendMsg, chatMessages, lastMessages, currentUser, sendTyping } =
    useChatMsgContext();
  const [open, setOpen] = useState(false);
  const [inputUser, setInputUser] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    SetInputMsg("");
    play();

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

  const setInputMsgHandler = (e) => {
    sendTyping();
    const { value } = e.target;
    SetInputMsg(value);
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
            return <UserSingleComponent data={curMsg} key={curMsg.msgId} />;
          })}
        </div>
      </div>

      <FindUserModal
        open={open}
        handleChangeFindUser={handleChangeFindUser}
        dismissModal={dismissModal}
        inputUser={inputUser}
        searchResult={searchResult}
      />

      <div className="right">
        <Header currentUser={currentUser} />
        <Body chatMessages={chatMessages} currentUserId={currentUser.userId} />

        <Footer
          submitHandler={submitHandler}
          inputMsg={inputMsg}
          setInputMsgHandler={setInputMsgHandler}
        />
      </div>
    </div>
  );
};

export default Wcomp;
