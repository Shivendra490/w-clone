import React, { useState } from "react";
import { useChatMsgContext } from "../../../../Providers/ChatMsgProvider/context";
import Header from "./components/Header";
import Body from "../../../../AtomComponents/Body";
import Footer from "./components/Footer";
import sendMsgAudio from "../../../../assets/Google Notification.mp3";
import { useSound } from "use-sound";

const RightWindow = () => {
  const [play] = useSound(sendMsgAudio);
  const [inputMsg, SetInputMsg] = useState("");
  const { sendMsg, chatMessages, currentUser, sendTyping } =
    useChatMsgContext();

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
      <Header currentUser={currentUser} />
      <Body chatMessages={chatMessages} currentUserId={currentUser.userId} />
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
