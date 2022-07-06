import React from "react";
import "./Wcomp.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Wcomp = () => {
  return (
    <div className="left-right-wrapper">
      <div className="left">
        <div className="chatHeadingWrapper">
          <div>chat</div>
          {/* <div>+</div>
          <div>set</div> */}
        </div>

        <input type="search" className="search" placeholder="enter name" />
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
          <div className="time">11:28pm</div>
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
          <div className="time">11:28pm</div>
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
          <div className="time">11:28pm</div>
        </div>

        <div className="mainCompWrapper">
          <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
            <Avatar>A</Avatar>
          </Stack>
          <div className="nameChatCombineWrapper">
            <div className="name">
              <h4>Arora</h4>
            </div>
            <div className="chat">hello all the best khijigjejleirjiler</div>
          </div>
          <div className="time">10:28pm</div>
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
          <div className="time">1:28pm</div>
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
          <div className="time">1:28pm</div>
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
          <div className="time">9:08pm</div>
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
          <div className="time">11:28pm</div>
        </div>

        <div className="mainCompWrapper">
          <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
            <Avatar>S</Avatar>
          </Stack>
          <div className="nameChatCombineWrapper">
            <div className="name">
              <h4>shiv</h4>
            </div>
            <div className="chat">hello all the best khijigjejleirjiler</div>
          </div>
          <div className="time">11:28pm</div>
        </div>

        <div className="mainCompWrapper">
          <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
            <Avatar>I</Avatar>
          </Stack>
          <div className="nameChatCombineWrapper">
            <div className="name">
              <h4>shiv</h4>
            </div>
            <div className="chat">hello all the best khijigjejleirjiler</div>
          </div>
          <div className="time">11:28pm</div>
        </div>

        <div className="mainCompWrapper">
          <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
            <Avatar>R</Avatar>
          </Stack>
          <div className="nameChatCombineWrapper">
            <div className="name">
              <h4>Ram</h4>
            </div>
            <div className="chat">hello all the best khijigjejleirjiler</div>
          </div>
          <div className="time">11:28pm</div>
        </div>

        <div className="mainCompWrapper">
          <Stack direction="row" spacing={2} style={{ padding: "0.2em" }}>
            <Avatar>S</Avatar>
          </Stack>
          <div className="nameChatCombineWrapper">
            <div className="name">
              <h4>Satyam</h4>
            </div>
            <div className="chat">hello all the best khijigjejleirjiler</div>
          </div>
          <div className="time">11:28pm</div>
        </div>
      </div>
      <div className="right">hello right</div>
    </div>
  );
};

export default Wcomp;
