import { createContext, useContext } from "react";

const initialValue = {
  chatMessages: {},
  lastMessages: [],
  currentUser: {},
  loading: false,
  sendMsg: () => {},
  fetchRoomById: () => {},
  setCurrentUser: () => {},
  sendOpenRoomEventToSocket: () => {},
  sendTyping: () => {},
  sendMsgNewUser: () => {},
  logoutUser: () => {},
};

const ChatMsgContext = createContext(initialValue);

export const useChatMsgContext = () => useContext(ChatMsgContext);

export default ChatMsgContext;
