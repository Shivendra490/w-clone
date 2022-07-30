import React, { useState } from "react";
import { useChatMsgContext } from "../../../../Providers/ChatMsgProvider/context";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import sendMsgAudio from "../../../../assets/Google Notification.mp3";
import { useSound } from "use-sound";
import { useResponsiveContext } from "../../../../Providers/ResponsiveContext/context";

const RightWindow = () => {
  const [play] = useSound(sendMsgAudio);
  const [inputMsg, SetInputMsg] = useState("");
  const {
    sendMsg,
    chatMessages,
    currentUser,
    sendTyping,
    loading,
    fetchRoomById,
  } = useChatMsgContext();
  const { toggleDrawer, isMobile } = useResponsiveContext();
  const submitHandler = (e) => {
    e.preventDefault();
    if (!inputMsg) {
      return;
    }
    play();
    sendMsg(inputMsg);
    SetInputMsg("");
  };

  const setInputMsgHandler = (e) => {
    sendTyping();
    const { value } = e.target;
    SetInputMsg(value);
  };

  return (
    <div className="right">
      <Header
        currentUser={currentUser}
        toggleDrawer={toggleDrawer}
        isMobile={isMobile}
      />
      <Body
        chatMessages={chatMessages}
        currentUserId={currentUser.userId}
        loading={loading}
        fetchRoomById={fetchRoomById}
      />
      <Footer
        submitHandler={submitHandler}
        inputMsg={inputMsg}
        setInputMsgHandler={setInputMsgHandler}
        setInputMsg={SetInputMsg}
      />
    </div>
  );
};

export default RightWindow;
