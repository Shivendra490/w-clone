import { createContext, useContext } from "react";

const initialValue = {
  chatMessages: [],
  sendMsg: (msg) => {},
};

const ChatMsgContext = createContext(initialValue);

export const useChatMsgContext = () => useContext(ChatMsgContext);

export default ChatMsgContext;
