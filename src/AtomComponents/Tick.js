import React from "react";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { DoneAllOutlined, ScheduleOutlined } from "@mui/icons-material";

const Tick = ({ status }) => {
  let Component;
  switch (status) {
    case "sent": {
      Component = (
        <DoneOutlinedIcon
          style={{ fontSize: "small", verticalAlign: "middle" }}
        />
      );
      break;
    }
    case "delivered": {
      Component = (
        <DoneAllOutlined
          style={{ fontSize: "small", verticalAlign: "middle" }}
        />
      );
      break;
    }
    case "read": {
      Component = (
        <DoneAllOutlined
          style={{
            fontSize: "small",
            color: "skyblue",
            verticalAlign: "middle",
          }}
        />
      );
      break;
    }
    case undefined: {
      Component = null;
      break;
    }
    default: {
      Component = (
        <ScheduleOutlined
          style={{ fontSize: "small", verticalAlign: "middle" }}
        />
      );
    }
  }
  return Component;
};

export default Tick;
