import React, { useEffect, useState } from "react";
import { useChatMsgContext } from "../../../../Providers/ChatMsgProvider/context";
import UserSingleComponent from "./components/UserSingleComponents/UserSingleComponent";
import ChatIcon from "@mui/icons-material/Chat";
import { Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InputBox from "../../../../AtomComponents/InputBox";
import FilterListIcon from "@mui/icons-material/FilterList";
import ChatButton from "../../../../AtomComponents/ChatButtons";
import { getUserFromLocalStorage } from "../../../../api/LocalStorage";

const currentUser = getUserFromLocalStorage();
const LeftWindow = ({ handleChatClick }) => {
  const { lastMessages } = useChatMsgContext();
  const [data, setData] = useState(lastMessages);
  const [filter, setFilter] = useState(false);

  const toggleFilter = () => {
    setFilter(!filter);
  };

  useEffect(() => {
    if (filter) {
      const filteredResult = lastMessages.filter(
        (lastMsg) => lastMsg.unread !== 0
      );
      setData(filteredResult);
    } else {
      setData(lastMessages);
    }
  }, [filter, lastMessages]);

  return (
    <div className="left">
      <div
        style={{
          height: "56px",
          background: "green",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px",
        }}
      >
        <div
          style={{ marginLeft: "2%", display: "flex", alignItems: "center" }}
        >
          <Avatar>
            {currentUser.username &&
              currentUser.username.slice(0, 1).toUpperCase()}
          </Avatar>
        </div>
        <div>
          <MoreVertIcon />
        </div>
      </div>
      <div
        style={{
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <InputBox
          width="85%"
          placeholder={"search messages here"}
          icon={true}
        />
        <div
          style={{ display: "grid", padding: "4px", color: "white" }}
          className={filter ? "filter-icon" : ""}
        >
          <FilterListIcon onClick={toggleFilter} />
        </div>
      </div>

      <div
        style={{
          padding: "1em",
          flex: "1 0 0",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <div className="relativeChatWrapper">
          <ChatButton
            onClick={handleChatClick}
            type="submit"
            Icon={<ChatIcon style={{ fill: "white" }} />}
          />
        </div>
        {data.map((curMsg) => {
          return <UserSingleComponent data={curMsg} key={curMsg.msgId} />;
        })}
      </div>
    </div>
  );
};

export default LeftWindow;
