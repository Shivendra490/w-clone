import React, { useState } from "react";
import "./Wcomp.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useChatMsgContext } from "../Providers/ChatMsgProvider/context";

const Wcomp = () => {
  const [inputMsg, SetInputMsg] = useState("");
  const { sendMsg } = useChatMsgContext();

  const submitHandler = () =>{
    sendMsg(inputMsg)
  }

  return (
    <div className="left-right-wrapper">
      <div className="left">
        <div className="chatHeadingWrapper">
          <div>chat</div>
          {/* <div>+</div>
          <div>set</div> */}
        </div>

        <input type="search" className="search" placeholder="search here" />
        <div className="mainCompWrapper">
          <Stack
            direction="row"
            spacing={2}
            style={{ padding: "0.2em", backgroundColor: "blue" }}
          >
            <Avatar>S</Avatar>
          </Stack>
          <div className="nameChatCombineWrapper">
            <div className="name">
              <h4>shiv</h4>
            </div>
            <div className="chat">
              <span>hello all the best khijigjejleirjiler </span>
            </div>
          </div>
          <div className="time">11:28 PM</div>
        </div>

        <div className="mainCompWrapper">
          <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
            <Avatar>I</Avatar>
          </Stack>
          <div className="nameChatCombineWrapper">
            <div className="name">
              <h4>Irish</h4>
            </div>
            <div className="chat">hello all the best khijigjejleirjiler</div>
          </div>
          <div className="time">11:28 PM</div>
        </div>

        <div className="mainCompWrapper">
          <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
            <Avatar>N</Avatar>
          </Stack>
          <div className="nameChatCombineWrapper">
            <div className="name">
              <h4>Nilu</h4>
            </div>
            <div className="chat">hello all the best khijigjejleirjiler</div>
          </div>
          <div className="time">11:28 PM</div>
        </div>

        <div className="mainCompWrapper">
          <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
            <Avatar>L</Avatar>
          </Stack>
          <div className="nameChatCombineWrapper">
            <div className="name">
              <h4>Lalit</h4>
            </div>
            <div className="chat">hello all the best khijigjejleirjiler</div>
          </div>
          <div className="time">1:28 PM</div>
        </div>

        <div className="mainCompWrapper">
          <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
            <Avatar>KL</Avatar>
          </Stack>
          <div className="nameChatCombineWrapper">
            <div className="name">
              <h4>Kamal</h4>
            </div>
            <div className="chat">hello all the best khijigjejleirjiler</div>
          </div>
          <div className="time">1:28 PM</div>
        </div>

        <div className="mainCompWrapper">
          <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
            <Avatar>HP</Avatar>
          </Stack>
          <div className="nameChatCombineWrapper">
            <div className="name">
              <h4>harry Potter</h4>
            </div>
            <div className="chat">hello all the best khijigjejleirjiler</div>
          </div>
          <div className="time">9:08 PM</div>
        </div>

        <div className="mainCompWrapper">
          <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
            <Avatar>AM</Avatar>
          </Stack>
          <div className="nameChatCombineWrapper">
            <div className="name">
              <h4>Amit</h4>
            </div>
            <div className="chat">hello all the best khijigjejleirjiler</div>
          </div>
          <div className="time">11:28 PM</div>
        </div>
      </div>

      <div className="right">
        <div className="topDetailsWrapper">
          <div className="userNameOnlineWrapper">
            <div className="userName">Alice</div>
            <div className="onOff">online</div>
          </div>
          <div className="dpWrapper">
            <Stack direction="row" spacing={2} style={{display:'grid',placeContent:'center'}}>
              <Avatar>L</Avatar>
            </Stack>
          </div>
        </div>
        <div className="chatWrapper">
          <span className="chat">hh</span>
          <span className="chat">ygdfuhu</span>
        </div>

        <div className="chatInputWrapper">
          <input type="text" className="chatInput" placeholder="Enter your message here"/>
          <div className="button">
            <button style={{width:'100%',height:'100%'}}>send</button>
          </div>
        </div>
      </div>
      <div className="right">
        hello right
        <input
          style={{ fontSize: "larger" }}
          value={inputMsg}
          onChange={(e) => SetInputMsg(e.target.value)}
        />
        <button onClick={submitHandler}> Send Message</button>
      </div>
    </div>
  );
};

export default Wcomp;
