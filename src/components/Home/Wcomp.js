import React from "react";
import "./Wcomp.css";
import RightWindow from "./components/RightWindow";
import LeftWindow from "./components/LeftWindow";
import { useResponsiveContext } from "../../Providers/ResponsiveContext/context";
import { ClickAwayListener, Drawer } from "@mui/material";

const Wcomp = () => {
  const { isDrawerOpen, toggleDrawer, isMobile } = useResponsiveContext();
  return (
    <div className="left-right-wrapper">
      {isDrawerOpen && isMobile && (
        <Drawer open={true}>
          <ClickAwayListener onClickAway={toggleDrawer}>
            <LeftWindow />
          </ClickAwayListener>
        </Drawer>
      )}
      {!isMobile && <LeftWindow />}

      <RightWindow />
    </div>
  );
};

export default Wcomp;
