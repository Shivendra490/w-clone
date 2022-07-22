import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChatMsgContext from "./context";
import { io } from "socket.io-client";
import getMessages from "../../api/getMessages";

import { getUserDetails } from "../../api/LocalStorage";
import { getLastMessages, getRoomId, sendMessage } from "../../api/Chat";
import { v4 as uuid } from "uuid";

const sock = io("https://w-clone-backend.herokuapp.com/", {
  autoConnect: false,
});

const ChatMsgProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState({});
  const [lastMessages, setLastMessages] = useState([]);
  const [userId, setuserId] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const fetchLastMessages = async () => {
    try {
      const { userId } = getUserDetails();
      const response = await getLastMessages(userId);
      if (response && response.status === "success") {
        setLastMessages(response.data);
      }
    } catch {}
  };

  const fetchMessages = async () => {
    try {
      //getMessages()
      // write the api for fetching the chat list from db
      //setChatMessages
    } catch (err) {
      //log or toast the error
    }
  };

  const fetchRoomId = async (receiverDetails) => {
    try {
      

      try {
        const lastMess = [...lastMessages];

        const x = lastMess.map((curElem) => {
         
          if (curElem.userDetails.userId === receiverDetails.userId) {
            return { ...curElem, ["unread"]: 0 };
          }
          return curElem;
        });
        

        setLastMessages(x);
      } catch (error) {
        console.log(error.message);
      }

      setCurrentUser(receiverDetails);
      const key = receiverDetails.userId;

      const { userId } = getUserDetails();
      const response = await getRoomId(userId, receiverDetails.userId);

      const value = response.data;
      if (response && response.status === "success") {
       
        setChatMessages({ ...chatMessages, [key]: value });
      }
    } catch {}
  };
 
  

  const receiveMsgFromSocket = useCallback(() => {
   
    sock.on("msg-receive", (msg, callback) => {
     console.log('payload',msg)
     console.log('currentuser',currentUser)
      const msgsenderId = msg.senderId;
      msgsenderId in chatMessages &&
        setChatMessages({
          ...chatMessages,
          [msgsenderId]: [msg, ...chatMessages[msgsenderId]],
        });
     

      try {
        const lastMess = [...lastMessages];

        const x = lastMess.map((curElem) => {
         
          if (curElem.userDetails.userId === msg.senderId) {
            console.log("79UUUUUUU", curElem.userDetails.userId, msg.senderId);
            curElem['unread']=curElem['unread']+1
            return { ...curElem, ...msg};
          }
          return curElem;
        });
       

        setLastMessages(x);
       

      } catch (error) {
        console.log(error.message);
      }

      if(msg.senderId===currentUser.userId){
        callback({ status: "read" });
      }
      else{
        callback({status:'delivered'})
      }
   
    });
  }, [chatMessages, lastMessages,currentUser]);


 

  



  

  const sendMsg = async (msg) => {
    
    try {
      const msgObj = {
        message: msg,
        msgId: uuid(),
        senderId: getUserDetails().userId,
        receiverId: currentUser.userId,
      };

      

      const modifiableMsg = {
        ...msgObj,
        createdAt: Date.now(),
        status: "pending",
      };

      setChatMessages({
        ...chatMessages,
        [modifiableMsg.receiverId]: [
          modifiableMsg,
          ...chatMessages[modifiableMsg.receiverId],
        ],
      });

    
      const lastMess = [...lastMessages];
      const x = lastMess.map((curElem) => {
        if (curElem.userDetails.userId === currentUser.userId) {
         
          return { ...curElem, ...modifiableMsg };
        }
        return curElem;
      });
     

     
      setLastMessages(x.sort((a,b)=>{if(a.createdAt<b.createdAt)return 1
        if(a.createdAt>b.createdAt)return -1
      return 0}));

      const response = await sendMessage(msgObj);
      

      if (response && response.status === "success") {
       
        const value = response.data;
        console.log(response);
        setChatMessages({
          ...chatMessages,
          [value.receiverId]: [value, ...chatMessages[value.receiverId]],
        });
     

        const lastMess = [...lastMessages];
        const x = lastMess.map((curElem) => {
          if (curElem.userDetails.userId === currentUser.userId) {
            
            return { ...curElem, ...value };
          }
          return curElem;
        });
        setLastMessages(x.sort((a,b)=>{if(a.createdAt<b.createdAt)return 1
          if(a.createdAt>b.createdAt)return -1
        return 0}));

      }
    } catch {}
  };

  useEffect(() => {
    sock.auth = { userId: getUserDetails().userId };
    sock.connect();
    fetchLastMessages();
  }, []);

  useEffect(() => {
    receiveMsgFromSocket();
    return () => sock.off("msg-receive");
  }, [receiveMsgFromSocket]);

  useEffect(() => {});

  const values = useMemo(
    () => ({
      chatMessages,
      lastMessages,
      fetchRoomId,
      sendMsg,
      currentUser,
    }),
    [chatMessages, lastMessages, currentUser]
  );
  return (
    <ChatMsgContext.Provider value={values}>{children}</ChatMsgContext.Provider>
  );
};

export default ChatMsgProvider;
