import "./App.css";
import ChatMsgProvider from "./Providers/ChatMsgProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Integrate from "./components/Login/Integrate";
import Wcomp from "./components/Home/Wcomp";

function App() {
  return (
    // <ChatMsgProvider>
    //   <Wcomp />
    // </ChatMsgProvider>

    // <Register/>
    // <Login/>
    // <LabTabs/>
    <Router>
      <Routes>
        <Route path="/" element={<Integrate />} />
        <Route
          path="/Wcomp"
          element={
            <ChatMsgProvider>
              <Wcomp />
            </ChatMsgProvider>
          }
        />
      </Routes>
    </Router>
    // <Integrate/>
  );
}

export default App;
