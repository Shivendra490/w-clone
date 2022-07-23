import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChatMsgContext from "./context";
import { io } from "socket.io-client";
import {
  deleteUserInLocalStorage,
  getUserFromLocalStorage,
} from "../../api/LocalStorage";
import {
  getlastMessages,
  getRoomById,
  sendMessageToUser,
} from "../../api/Chat";
import { v4 as uuid } from "uuid";
import msgReceiveAudio from "../../assets/ding-36029.mp3";
import useSound from "use-sound";
import { debounce } from "@mui/material";
import { BASE_URL } from "../../Constants/url";
import { useNavigate } from "react-router-dom";

const sock = io(BASE_URL, {
  autoConnect: false,
});

const ChatMsgProvider = ({ children }) => {
  const [play] = useSound(msgReceiveAudio);
  const [chatMessages, setChatMessages] = useState({});
  const [lastMessages, setLastMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendStopTyping = useCallback(
    debounce(
      (senderId, receiverId) =>
        sock.emit("stop-typing", { senderId, receiverId }),
      1500
    ),
    []
  );

  const sendTyping = useCallback(() => {
    const senderId = getUserFromLocalStorage().userId;
    const receiverId = currentUser.userId;
    sock.emit("send-typing", { senderId, receiverId });
    sendStopTyping(senderId, receiverId);
  }, [currentUser, sendStopTyping]);

  const receiveTypingStatusFromSocket = useCallback(() => {
    sock.on("typing-status", ({ senderId, receiverId, typing }) => {
      if (currentUser.userId === senderId) {
        setCurrentUser({ ...currentUser, typing });
      }
      const cloneLastMsgArray = [...lastMessages];
      const index = cloneLastMsgArray.findIndex(
        (lastMsg) => lastMsg.userDetails.userId === senderId
      );
      if (index !== -1) {
        cloneLastMsgArray[index].userDetails = {
          ...cloneLastMsgArray[index].userDetails,
          typing,
        };
      }
      setLastMessages(cloneLastMsgArray);
    });
  }, [currentUser, lastMessages]);

  const receiveOnlineStatusFromSocket = useCallback(() => {
    sock.on("user-online", ({ receiverId, online }) => {
      if (currentUser.userId === receiverId) {
        setCurrentUser({ ...currentUser, online });
      }
    });
  }, [currentUser]);

  const getRoomMsgById = async (currentUserDetails) => {
    const receiverId = currentUserDetails.userId;
    if (!receiverId) {
      return;
    }
    setCurrentUser({ ...currentUserDetails });

    const senderId = getUserFromLocalStorage().userId;
    setLastMessages((lastMessages) => {
      const index = lastMessages.findIndex(
        (lastMsg) => lastMsg.userDetails.userId === receiverId
      );
      if (index !== -1) {
        lastMessages[index].unread = 0;
      }
      return lastMessages;
    });

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
      play();
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
                if (currentUser.userId !== lastMsg.userDetails.userId) {
                  lastMsg.unread += 1;
                }
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
  }, [currentUser, chatMessages, play]);

  const sendMsg = async (msg) => {
    const senderId = getUserFromLocalStorage().userId;
    const receiverId = currentUser.userId;
    if (!receiverId || !senderId) {
      return;
    }
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
    cloneLastMsgArray.sort((a, b) => b.createdAt - a.createdAt);
    setLastMessages(cloneLastMsgArray);
  };

  const logoutUser = () => {
    deleteUserInLocalStorage();
    navigate("/");
  };

  useEffect(() => {
    fetchLastMessages();
    sock.auth = { userId: getUserFromLocalStorage().userId };
    sock.connect();
  }, []);

  useEffect(() => {
    receiveMsgFromSocket();
    return () => {
      sock.off("msg-receive");
    };
  }, [receiveMsgFromSocket]);

  useEffect(() => {
    UpdateRoomStatusFromSocket();
    return () => {
      sock.off("update-room-status");
    };
  }, [UpdateRoomStatusFromSocket]);

  useEffect(() => {
    receiveTypingStatusFromSocket();
    return () => {
      sock.off("typing-status");
    };
  }, [receiveTypingStatusFromSocket]);

  useEffect(() => {
    receiveOnlineStatusFromSocket();
    return () => sock.off("user-online");
  }, [receiveOnlineStatusFromSocket]);

  useEffect(() => {});
  const values = useMemo(
    () => ({
      chatMessages,
      sendMsg,
      currentUser,
      lastMessages,
      setCurrentUser,
      getRoomMsgById,
      sendTyping,
      logoutUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chatMessages, lastMessages, currentUser]
  );
  return (
    <ChatMsgContext.Provider value={values}>{children}</ChatMsgContext.Provider>
  );
};

export default ChatMsgProvider;
