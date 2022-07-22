import React from "react";
import SendIcon from "@mui/icons-material/Send";
import ChatButton from "./ChatButtons";
import InputBox from "./InputBox";

const Footer = ({ inputMsg, setInputMsgHandler, submitHandler }) => {
  return (
    <form style={{ padding: "4px 16px" }}>
      <div className="chatInputWrapper">
        <InputBox
          value={inputMsg}
          onChange={setInputMsgHandler}
          placeholder="Enter your message here"
          height="48px"
        />
        <div className="button">
          {inputMsg && (
            <ChatButton
              Icon={<SendIcon style={{ color: "white" }} />}
              onClick={submitHandler}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default Footer;
