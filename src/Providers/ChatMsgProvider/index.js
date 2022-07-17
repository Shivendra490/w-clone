import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChatMsgContext from "./context";
import { io } from "socket.io-client";
import getMessages from "../../api/getMessages";
import { getUserFromLocalStorage } from "../../api/LocalStorage";
import {
  getlastMessages,
  getRoomById,
  sendMessageToUser,
} from "../../api/Chat";
import { v4 as uuid } from "uuid";

const sock = io("http://localhost:5000/", { autoConnect: false });

const ChatMsgProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState({});
  const [lastMessages, setLastMessages] = useState([]);
  const [userId, setuserId] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const fetchLastMessages = async () => {
    try {
      const userId = getUserFromLocalStorage().userId;
      if (!userId) {
        return;
      }
      const response = await getlastMessages(userId);
      if (response && response.status === "success") {
        setLastMessages(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getRoomMsgById = async (currentUserDetails) => {
    const receiverId = currentUserDetails.userId;
    setCurrentUser({ ...currentUserDetails });
    const senderId = getUserFromLocalStorage().userId;
    if (!receiverId) {
      return;
    }
    const response = await getRoomById(senderId, receiverId);
    if (response && response.status === "success") {
      setChatMessages({ ...chatMessages, [receiverId]: response.data });
    }
  };

  // const sendMessageToNewUser = (userDetails)=>{
  //   setCurrentUser(userDetails);

  //   setCurrentUser({...chatMessages, []})
  // }

  const receiveMsgFromSocket = useCallback(() => {
    sock.on("msg-receive", (msgObj, confirmation) => {
      // save msgObj in chatMessage and lastMessage
      if (msgObj.senderId === currentUser.userId) {
        confirmation({ status: "read" });
      } else {
        confirmation({ status: "delivered" });
      }
      // this will change
      //setChatMessages([msg, ...chatMessages]);
      // set message received to proper place
      // since the msg would be of UNREAD status, bring the unread msg to the top in chatMessage.
    });
  }, [currentUser]);

  const changeStatusToRead = (roomId, msgId) => {
    //when particular room is opened then set all of its messages status to read.
    //send event to socket that msg is read
    //sock.emit('msg-status-update', {roomId,msgId})
  };

  const sendMsg = async (msg) => {
    const senderId = getUserFromLocalStorage().userId;
    const msgObj = {
      senderId,
      receiverId: currentUser.userId,
      msgId: uuid(),
      message: msg,
    };
    const cloneUserMsgArray = chatMessages[msgObj.receiverId];
    cloneUserMsgArray.unshift({
      ...msgObj,
      status: "pending",
      createdAt: Date.now(),
    });
    setChatMessages({
      ...chatMessages,
      [msgObj.receiverId]: cloneUserMsgArray,
    });

    const response = await sendMessageToUser(msgObj);
    if (response && response.status === "success") {
      cloneUserMsgArray[0] = response.data;
      setChatMessages({
        ...chatMessages,
        [msgObj.receiverId]: cloneUserMsgArray,
      });
    }

    const newMessage = cloneUserMsgArray[0];
    // set to lastmessage

    // sock.emit("msg-send", { msg }, "qfFDo9kc42DxwxcDAAAJ", (ack) => {
    //   if (ack.ok) {
    //     //append new msg in chatMessage set msgId status to sent
    //   } else {
    //     //append new msg in chatMessage to pending
    //   }
    // });
  };

  useEffect(() => {
    fetchLastMessages();
    sock.auth = { userId: getUserFromLocalStorage().userId };
    sock.connect();
  }, []);

  useEffect(() => {
    receiveMsgFromSocket();
    return () => sock.off("msg-receive");
  }, [receiveMsgFromSocket]);

  useEffect(() => {});
  const values = useMemo(
    () => ({
      chatMessages,
      sendMsg,
      currentUser,
      lastMessages,
      setCurrentUser,
      getRoomMsgById,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chatMessages, lastMessages]
  );
  return (
    <ChatMsgContext.Provider value={values}>{children}</ChatMsgContext.Provider>
  );
};

export default ChatMsgProvider;
