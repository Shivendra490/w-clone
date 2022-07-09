import "./App.css";
import Wcomp from "./components/Wcomp";
import { io } from "socket.io-client";
import { useEffect } from "react";
import ChatMsgProvider from "./Providers/ChatMsgProvider";


function App() {
  useEffect(() => {
    const sock = io("http://localhost:5000/");

    sock.on("receive", (payload) => {
      console.log(payload);
    });

    sock.emit("send", "hello");

    sock.on("disconnect", () => {
      console.log("i am disconnected");
    });
    return () => sock.off("receive");
  }, []);

  return (
    <ChatMsgProvider>
      <Wcomp />
    </ChatMsgProvider>
  );
}

export default App;
