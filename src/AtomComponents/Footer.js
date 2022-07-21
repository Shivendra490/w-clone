import React from "react";
import SendIcon from "@mui/icons-material/Send";

const Footer = ({ inputMsg, setInputMsgHandler, submitHandler }) => {
  return (
    <form className="chatInputWrapper">
      <input
        type="text"
        className="chatInput"
        placeholder="Enter your message here"
        value={inputMsg}
        onChange={setInputMsgHandler}
      />
      <div className="button">
        <button
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "green",
            borderRadius: "50px",
          }}
          type="submit"
          onClick={submitHandler}
        >
          <SendIcon style={{ color: "white" }} />
        </button>
      </div>
    </form>
  );
};

export default Footer;
