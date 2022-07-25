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
  const [loading, setLoading] = useState(false);
  const [chatRoomMap, setChatRoomMap] = useState(new Map());
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
    if (senderId && receiverId) {
      sock.emit("send-typing", { senderId, receiverId });
      sendStopTyping(senderId, receiverId);
    }
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

  const sendOpenRoomEventToSocket = useCallback((currentUserDetails) => {
    try {
      const senderId = getUserFromLocalStorage().userId;
      const receiverId = currentUserDetails.userId;
      if (!receiverId) {
        return;
      }
      sock.emit("user-room-open", { senderId, receiverId }); // send open room socket event
      setCurrentUser({ ...currentUserDetails });
      setLastMessages((lastMessages) => {
        const index = lastMessages.findIndex(
          (lastMsg) => lastMsg.userDetails.userId === receiverId
        );
        if (index !== -1) {
          lastMessages[index].unread = 0;
        }
        return lastMessages;
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchRoomById = useCallback(async () => {
    try {
      const senderId = getUserFromLocalStorage().userId;
      const receiverId = currentUser.userId;

      let apiValue = chatRoomMap.get(receiverId);
      if (apiValue !== undefined) {
        if (apiValue.next === false) return;
      } else {
        apiValue = { page: 0, next: true };
      }

      setLoading(true);
      const response = await getRoomById(senderId, receiverId, apiValue.page);
      if (response && response.status === "success") {
        //since limit per doc is 30
        if (response.data.length < 30) {
          chatRoomMap.set(receiverId, {
            next: false,
            page: apiValue.page + 1,
          });
        } else {
          chatRoomMap.set(receiverId, {
            next: true,
            page: apiValue.page + 1,
          });
        }
        setChatMessages({
          ...chatMessages,
          [receiverId]: [...(chatMessages[receiverId] || []), ...response.data],
        });
        setChatRoomMap(chatRoomMap);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [chatMessages, chatRoomMap, currentUser]);

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
                  switch (status) {
                    case "delivered":
                      if (chatMsg.status === "sent") {
                        chatMsg.status = status;
                      }
                      break;
                    case "read":
                      if (chatMsg.status !== "read") {
                        chatMsg.status = status;
                      }
                      break;
                    default:
                  }
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
    sock.on("msg-receive", (payload, confirmation) => {
      const { msgObj, userDetails } = payload;
      play();

      const cloneChatMsgArray = { ...chatMessages };
      const cloneLastMsgArray = [...lastMessages];

      if (cloneChatMsgArray[msgObj.senderId]) {
        cloneChatMsgArray[msgObj.senderId].unshift(msgObj);
      } else {
        cloneChatMsgArray[msgObj.senderId] = [msgObj];
      }
      setChatMessages({ ...cloneChatMsgArray });

      const index = cloneLastMsgArray.findIndex(
        (lastMsg) => lastMsg.userDetails.userId === msgObj.senderId
      );
      if (index === -1) {
        const modifiedLastMsgObj = {
          ...msgObj,
          userDetails,
        };
        cloneLastMsgArray.unshift(modifiedLastMsgObj);
        if (currentUser.userId !== msgObj.senderId) {
          cloneLastMsgArray[0].unread = 1;
        }
      } else {
        cloneLastMsgArray[index] = {
          ...cloneLastMsgArray[index],
          ...msgObj,
        };
        if (currentUser.userId !== msgObj.senderId) {
          cloneLastMsgArray[index].unread = cloneLastMsgArray[index].unread + 1;
        }
      }

      cloneLastMsgArray.sort((a, b) => b.createdAt - a.createdAt);
      setLastMessages([...cloneLastMsgArray]);
      if (msgObj.senderId === currentUser.userId) {
        confirmation({ status: "read" });
      } else {
        confirmation({ status: "delivered" });
      }
    });
  }, [currentUser, lastMessages, chatMessages, play]);

  const sendMsg = async (msg) => {
    const senderId = getUserFromLocalStorage().userId;
    const receiverId = currentUser.userId;
    const cloneChatMsgArray = { ...chatMessages };
    const cloneLastMsgArray = [...lastMessages];
    if (!receiverId || !senderId) {
      return;
    }
    const msgObj = {
      senderId,
      receiverId: receiverId,
      msgId: uuid(),
      message: msg,
    };
    const modifiedMsgObj = {
      ...msgObj,
      status: "pending",
      createdAt: Date.now(),
    };

    // setting chat messages

    if (cloneChatMsgArray[receiverId]) {
      cloneChatMsgArray[receiverId].unshift(modifiedMsgObj);
    } else {
      cloneChatMsgArray[receiverId] = [modifiedMsgObj];
    }
    setChatMessages({ ...cloneChatMsgArray });

    // setting last messages
    const index = cloneLastMsgArray.findIndex(
      (lastMsg) => lastMsg.userDetails.userId === receiverId
    );
    if (index === -1) {
      const modifiedLastMsgObj = {
        ...modifiedMsgObj,
        userDetails: currentUser,
      };
      cloneLastMsgArray.unshift(modifiedLastMsgObj);
    } else {
      cloneLastMsgArray[index] = {
        ...cloneLastMsgArray[index],
        ...modifiedMsgObj,
      };
    }
    cloneLastMsgArray.sort((a, b) => b.createdAt - a.createdAt);
    setLastMessages([...cloneLastMsgArray]);

    // setting chat messages and last chat messages after response
    const myDetails = getUserFromLocalStorage();
    const response = await sendMessageToUser(msgObj, myDetails);
    if (response && response.status === "success") {
      cloneChatMsgArray[receiverId][0] = response.data;
      setChatMessages({ ...cloneChatMsgArray });

      cloneLastMsgArray[0] = { ...cloneLastMsgArray[0], ...response.data };
      setLastMessages([...cloneLastMsgArray]);
    }
  };

  const sendMsgNewUser = (newUserDetails) => {
    setCurrentUser(newUserDetails);
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
      loading,
      currentUser,
      lastMessages,
      sendMsg,
      setCurrentUser,
      fetchRoomById,
      sendTyping,
      sendMsgNewUser,
      sendOpenRoomEventToSocket,
      logoutUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chatMessages, lastMessages, currentUser, loading]
  );
  return (
    <ChatMsgContext.Provider value={values}>{children}</ChatMsgContext.Provider>
  );
};

export default ChatMsgProvider;
