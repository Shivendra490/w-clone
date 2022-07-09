import "./App.css";
import Wcomp from "./components/Wcomp";
import ChatMsgProvider from "./Providers/ChatMsgProvider";


function App() {

  return (
    <ChatMsgProvider>
      <Wcomp />
    </ChatMsgProvider>
  );
}

export default App;
