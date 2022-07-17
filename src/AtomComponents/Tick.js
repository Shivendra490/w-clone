import React from "react";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { DoneAllOutlined, ScheduleOutlined } from "@mui/icons-material";

const Tick = ({ status }) => {
  let Component;
  switch (status) {
    case "sent": {
      Component = <DoneOutlinedIcon style={{ fontSize: "small" }} />;
      break;
    }
    case "delivered": {
      Component = <DoneAllOutlined style={{ fontSize: "small" }} />;
      break;
    }
    case "read": {
      Component = (
        <DoneAllOutlined style={{ fontSize: "small", color: "skyblue" }} />
      );
      break;
    }
    default: {
      Component = <ScheduleOutlined style={{ fontSize: "small" }} />;
    }
  }
  return Component;
};

export default Tick;
