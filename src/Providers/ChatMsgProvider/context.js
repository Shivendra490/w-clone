import { createContext, useContext } from "react";

const initialValue = {
  chatMessages: {},
  sendMsg: (msg) => {},
  lastMessages: [],
  currentUser: {},
  setCurrentUser: () => {},
  getRoomMsgById: (receiverId) => {},
};

const ChatMsgContext = createContext(initialValue);

export const useChatMsgContext = () => useContext(ChatMsgContext);

export default ChatMsgContext;
