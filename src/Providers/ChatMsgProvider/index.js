import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChatMsgContext from "./context";
import { io } from "socket.io-client";
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

  const UpdateRoomStatusFromSocket = useCallback(() => {
    sock.on("update-room-status", (payload) => {
      try {
        const userId = getUserFromLocalStorage().userId;
        const { receiverId, status } = payload;
        if (receiverId && status) {
          if (chatMessages[receiverId]) {
            setChatMessages({
              ...chatMessages,
              ...chatMessages[receiverId].map((chatMsg) => {
                // check receiverID equality
                // check if incoming status delivered then status !=read
                if (chatMsg.receiverId === receiverId) {
                  chatMsg.status = status;
                }
                return chatMsg;
              }),
            });
          }
          const index = lastMessages.findIndex(
            (lastMsg) =>
              lastMsg.senderId === userId && lastMsg.receiverId === receiverId
          );
          const cloneLastMsgArray = [...lastMessages];
          cloneLastMsgArray[index].status = status;
          setLastMessages(cloneLastMsgArray);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }, [chatMessages, lastMessages]);

  const receiveMsgFromSocket = useCallback(() => {
    sock.on("msg-receive", (msgObj, confirmation) => {
      const cloneUserMsgArray = chatMessages[msgObj.senderId] || [];
      cloneUserMsgArray.unshift(msgObj);
      setChatMessages({
        ...chatMessages,
        [msgObj.senderId]: cloneUserMsgArray,
      });
      setLastMessages((lastMessages) => {
        return [
          ...lastMessages
            .map((lastMsg) => {
              if (lastMsg.userDetails.userId === msgObj.senderId) {
                return { ...lastMsg, ...msgObj };
              }
              return lastMsg;
            })
            .sort((a, b) => b.createdAt - a.createdAt),
        ];
      });
      if (msgObj.senderId === currentUser.userId) {
        confirmation({ status: "read" });
      } else {
        confirmation({ status: "delivered" });
      }
    });
  }, [currentUser, chatMessages]);

  const sendMsg = async (msg) => {
    const senderId = getUserFromLocalStorage().userId;
    const receiverId = currentUser.userId;
    const msgObj = {
      senderId,
      receiverId: receiverId,
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
    //set last send message to last message
    const index = lastMessages.findIndex(
      (lastMsg) => lastMsg.userDetails.userId === receiverId
    );
    const cloneLastMsgArray = [...lastMessages];
    cloneLastMsgArray[index] = { ...lastMessages[index], ...newMessage };
    setLastMessages(cloneLastMsgArray);
  };

  useEffect(() => {
    fetchLastMessages();
    sock.auth = { userId: getUserFromLocalStorage().userId };
    sock.connect();
  }, []);

  useEffect(() => {
    receiveMsgFromSocket();
    UpdateRoomStatusFromSocket();
    return () => {
      sock.off("msg-receive");
      sock.off("update-room-status");
    };
  }, [receiveMsgFromSocket, UpdateRoomStatusFromSocket]);

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
