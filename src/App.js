import "./App.css";
import Integrate from "./components/Integrate";
import LabTabs from "./components/LabTabs";
import Login from "./components/Login";
import Register from "./components/Register";
import Wcomp from "./components/Wcomp";
import ChatMsgProvider from "./Providers/ChatMsgProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
