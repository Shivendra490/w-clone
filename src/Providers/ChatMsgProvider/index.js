import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChatMsgContext from "./context";
import { io } from "socket.io-client";
// import getMessages from "../../api/getMessages";
import alertTone from "../../AtomComponents/Audio/alertTone.wav"

import { getUserDetails } from "../../api/LocalStorage";
import { getLastMessages, getRoomId, sendMessage } from "../../api/Chat";
import { v4 as uuid } from "uuid";
import { debounce } from "@mui/material";
import useSound from 'use-sound';


const sock = io("https://w-clone-backend.herokuapp.com/", {
  autoConnect: false,
});

const ChatMsgProvider = ({ children }) => {

  const [play] = useSound(alertTone);

  // const playSound=(url)=> {
    
  //   console.log("ye chal raha h")
  //   audio.play();
  // }

  const [chatMessages, setChatMessages] = useState({});
  const [lastMessages, setLastMessages] = useState([]);
  const [userId, setuserId] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const sendMsgToNewUser=(userDetails)=>{
    console.log(userDetails,'21index')
    setCurrentUser(userDetails.data)
  }

  console.log(currentUser);

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
   
    sock.on("msg-receive", (payload, callback) => {
    
    play()
   
    const {msgObj:msg,userDetails}=payload
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
            
            curElem['unread']=curElem['unread']+1
            
            return { ...curElem, ...msg};
          }
          return curElem;
        }).sort((a,b)=>b.createdAt-a.createdAt)
       

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


  const updateMessageStatus=useCallback(()=>{
    

      sock.on('update-room-status',(data)=>{
        // console.log('126',data)
        // console.log('127',chatMessages);
        console.log(lastMessages)
        const {receiverId,status}=data;

        const arrayValue=chatMessages[receiverId]

        const x=arrayValue.map((curObj)=>{
          if (curObj.senderId===getUserDetails().userId){
              curObj.status=status   
          }
          return curObj
        })


        setChatMessages({...chatMessages,[receiverId]:x})

        const y=lastMessages.map((curElem)=>{
          if(curElem.senderId===getUserDetails().userId && curElem.userDetails.userId===receiverId){
            curElem.status=status
          }
          return curElem
        })

        setLastMessages(y)

      
      })
       

        
        

    
  },[chatMessages])




console.log('@@@@@@hhLM',lastMessages)


  const updateTypingStatus=useCallback(()=>{
    

    sock.on('typing-status',(data)=>{
     console.log('170',data)
     if(currentUser.userId===data.senderId){
      setCurrentUser({...currentUser,typing:data.typing})
      ////////////////////////////////////////////////
      const x=lastMessages.map((curElem)=>{
        if(curElem.userDetails.userId===data.senderId){
          curElem['typing']=data.typing
        }
        return curElem
      })
      console.log('xxx',x)
      setLastMessages(x)
      ////////////////////////////////////////////////

     }
    }
     
     )
    },[currentUser,lastMessages])


    const sendStopTyping = useCallback(
      debounce(
        (senderId, receiverId) =>
          sock.emit("stop-typing", { senderId, receiverId }),
        1500
      ),
      []
    );

    const sendTyping=()=>{

     const senderId=getUserDetails().userId
      const receiverId=currentUser.userId
      
      if(receiverId){
        sock.emit('send-typing',{senderId:senderId,receiverId:receiverId})
      }

      
      sendStopTyping(senderId,receiverId)
      
      
    }


    const userOnline=()=>{

      
      
      sock.on('user-online',({receiverId,online})=>{
        console.log()
        if(currentUser.userId===receiverId){
          setCurrentUser({...currentUser,online:online})
        }
      })

    }


 

  



  

  const sendMsg = async (msg) => {
    
    try {
      const myDetails=getUserDetails()
      const msgObj = {
        message: msg,
        msgId: uuid(),
        senderId: myDetails.userId,
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

      const response = await sendMessage(msgObj,myDetails);
      

      if (response && response.status === "success") {
       
        const value = response.data;
        // console.log(response);
        setChatMessages({
          ...chatMessages,
          [value.receiverId]: [value, ...chatMessages[value.receiverId]],
        }
        
        );
        play()
     

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
    updateMessageStatus()
    updateTypingStatus()
    userOnline()
    return () => {sock.off("msg-receive");
  sock.off("update-room-status");
sock.off("typing-status");sock.off('stop-typing');
sock.off('user-online')};
    
  }, [receiveMsgFromSocket,updateMessageStatus,updateTypingStatus]);

 

  const values = useMemo(
    () => ({
      chatMessages,
      lastMessages,
      fetchRoomId,
      sendMsg,
      currentUser,
      sendMsgToNewUser,
      sendTyping
    }),
    [chatMessages, lastMessages, currentUser]
  );
  return (
    <ChatMsgContext.Provider value={values}>{children}</ChatMsgContext.Provider>
  );
};

export default ChatMsgProvider;
