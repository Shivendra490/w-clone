import "./App.css";
import ChatMsgProvider from "./Providers/ChatMsgProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Integrate from "./components/Login/Integrate";
import Wcomp from "./components/Home/Wcomp";
import ResponsiveProvider from "./Providers/ResponsiveContext";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Integrate />} />
        <Route
          path="/Wcomp"
          element={
            <ChatMsgProvider>
              <ResponsiveProvider>
                <Wcomp />
              </ResponsiveProvider>
            </ChatMsgProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
