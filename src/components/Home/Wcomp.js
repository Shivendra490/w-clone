import React from "react";
import "./Wcomp.css";
import RightWindow from "./components/RightWindow";
import LeftWindow from "./components/LeftWindow";
import ResponsiveProvider from "../../Providers/ResponsiveContext";

const Wcomp = () => {
  return (
    <div className="left-right-wrapper">
      <ResponsiveProvider>
        <LeftWindow />
      </ResponsiveProvider>
      <RightWindow />
    </div>
  );
};

export default Wcomp;
