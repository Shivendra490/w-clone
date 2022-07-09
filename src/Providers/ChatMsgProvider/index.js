import React, { useEffect, useMemo, useState } from "react";
import ChatMsgContext from "./context";
import { io } from "socket.io-client";
import getMessages from "../../api/getMessages";

const chatData = [
  { pic: "A", name: "Amit", chat: "Gud morn", time: "11:28 AM" },
  { pic: "B", name: "Bumrah", chat: "bowling", time: "10:25 PM" },
  { pic: "S", name: "sehwag", chat: "Hey", time: "01:28 AM" },
  {
    pic: "G",
    name: "Gautam",
    chat: "Member of Parliament",
    time: "02:24 APM",
  },
];

const sock = io("http://localhost:5000");
const ChatMsgProvider = ({ children }) => {
  const [chatMessages, SetChatMessages] = useState(chatData);

  const fetchMessages = async () => {
    try {
      //getMessages()
      // write the api for fetching the chat list from db
      //setChatMessages
    } catch (err) {
      //log or toast the error
    }
  };
  const receiveMsgFromSocket = () => {
    sock.on("msg-receive", (msg, callback) => {
      // set message received to proper place
      // since the msg would be of UNREAD status, bring the unread msg to the top in chatMessage.
      callback({ ok: true });
    });
  };

  const changeStatusToRead = (roomId, msgId) => {
    //when particular room is opened then set all of its messages status to read.
    //send event to socket that msg is read
    //sock.emit('msg-status-update', {roomId,msgId})
  };

  const changeStatusToDelivered = () => {};

  const sendMsg = (msg) => {
    sock.emit("msg-send", { payload: msg }, (ack) => {
      console.log(ack);
      if (ack.ok) {
        //append new msg in chatMessage set msgId status to sent
      } else {
        //append new msg in chatMessage to pending
      }
    });
  };
  useEffect(() => {
    //make a api call to get messages
    //fetchMessages()
  }, []);

  useEffect(() => {
    receiveMsgFromSocket();
    return () => sock.off("msg-receive");
  }, []);

  useEffect(() => {});
  const values = useMemo(
    () => ({
      chatMessages,
      sendMsg,
    }),
    [chatMessages]
  );
  return (
    <ChatMsgContext.Provider value={values}>{children}</ChatMsgContext.Provider>
  );
};

export default ChatMsgProvider;
