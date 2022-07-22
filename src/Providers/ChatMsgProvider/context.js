import { createContext, useContext } from "react";

const initialValue = {
  chatMessages: {},
  lastMessages:[],
  fetchRoomId:(receiverDetails)=>{},
  sendMsg:(msg) => {},
  currentUser:{}
};

const ChatMsgContext = createContext(initialValue);

export const useChatMsgContext = () => useContext(ChatMsgContext);

export default ChatMsgContext;
