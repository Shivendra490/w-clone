import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ChatButton from "../../../../../../AtomComponents/ChatButtons";
import InputBox from "../../../../../../AtomComponents/InputBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from "emoji-picker-react";
import { ClickAwayListener } from "@mui/material";

const Footer = ({
  inputMsg,
  setInputMsg,
  setInputMsgHandler,
  submitHandler,
}) => {
  const [emojiOpen, setEmojiOpen] = useState(false);

  const toggleEmojiOptions = () => {
    setEmojiOpen(!emojiOpen);
  };

  const onEmojiClickhadler = (e, emojiObject) => {
    setInputMsg(inputMsg + emojiObject.emoji);
  };
  return (
    <div style={{ padding: "4px 16px", backgroundColor: "black" }}>
      <div className="chatInputWrapper">
        {emojiOpen && (
          <ClickAwayListener onClickAway={() => setEmojiOpen(false)}>
            <div style={{ position: "absolute", bottom: 70, right: 0 }}>
              {emojiOpen && <EmojiPicker onEmojiClick={onEmojiClickhadler} />}
            </div>
          </ClickAwayListener>
        )}
        <InputBox
          value={inputMsg}
          onChange={setInputMsgHandler}
          placeholder="Enter your message here"
          height="48px"
          width={"95%"}
        />
        <div className="button">
          <ChatButton
            Icon={<EmojiEmotionsIcon style={{ color: "white" }} />}
            onClick={toggleEmojiOptions}
          />
        </div>
        <div className="button">
          {inputMsg && (
            <ChatButton
              Icon={<SendIcon style={{ color: "white" }} />}
              onClick={submitHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
