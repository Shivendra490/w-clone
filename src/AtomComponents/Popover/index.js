import { ClickAwayListener } from "@mui/material";
import React from "react";
import "./styles.css";

const Popover = ({ open, children, handleClose }) => {
  return (
    open && (
      <ClickAwayListener onClickAway={handleClose}>
        <div className="popover">{children}</div>
      </ClickAwayListener>
    )
  );
};

export default Popover;
