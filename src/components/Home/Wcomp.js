import React from "react";
import "./Wcomp.css";
import RightWindow from "./components/RightWindow";
import LeftWindow from "./components/LeftWindow";

const Wcomp = () => {
  return (
    <div className="left-right-wrapper">
      <LeftWindow />
      <RightWindow />
    </div>
  );
};

export default Wcomp;
