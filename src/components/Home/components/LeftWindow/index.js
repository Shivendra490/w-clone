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
import Popover from "../../../../AtomComponents/Popover";
import FindUserModal from "../Modals/FindUserModal";
import { findUser } from "../../../../api/Chat";
import { useResponsiveContext } from "../../../../Providers/ResponsiveContext/context";

const LeftWindow = React.forwardRef((props, ref) => {
  const myDetails = getUserFromLocalStorage();
  const {
    lastMessages,
    sendOpenRoomEventToSocket,
    logoutUser,
    sendMsgNewUser,
  } = useChatMsgContext();
  const { toggleDrawer } = useResponsiveContext();
  const [data, setData] = useState(lastMessages);
  const [filter, setFilter] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputUser, setInputUser] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const handleChangeFindUser = async (e) => {
    const { value } = e.target;
    setInputUser(value);
    if (value.length > 10) {
      return;
    }
    if (value.length === 10) {
      if (value === myDetails.phone) {
        setSearchResult(myDetails);
      } else {
        const response = await findUser(value);
        if (response && response.status === "success") {
          setSearchResult(response.data);
        } else {
          setSearchResult({ username: "-", phone: "Not registered" });
        }
      }
    } else {
      setSearchResult({});
    }
  };

  const handleNewMessageClick = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const dismissModal = () => {
    setOpen(false);
  };

  const toggleFilter = () => {
    setFilter(!filter);
  };

  const onRoomClickHandler = (userDetails) => {
    sendOpenRoomEventToSocket(userDetails);
    toggleDrawer();
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

  const togglePopover = () => {
    setOpenPopover(true);
  };
  const handleClose = () => {
    setOpenPopover(false);
  };

  const onLogoutHandler = () => {
    logoutUser();
  };

  const onNewMessageClickHandler = () => {
    sendMsgNewUser(searchResult);
    setOpen(false);
  };

  return (
    <div className="left" ref={ref}>
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
            {myDetails.username && myDetails.username.slice(0, 1).toUpperCase()}
          </Avatar>
        </div>
        <div style={{ position: "relative" }} onClick={togglePopover}>
          <MoreVertIcon style={{ cursor: "pointer" }} />
          <Popover open={openPopover} handleClose={handleClose}>
            <span className="popover-elements" onClick={onLogoutHandler}>
              Logout
            </span>
          </Popover>
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
        }}
      >
        <div className="relativeChatWrapper">
          <ChatButton
            onClick={handleNewMessageClick}
            type="submit"
            Icon={<ChatIcon style={{ fill: "white" }} />}
          />
        </div>
        {data.map((curMsg) => {
          return (
            <UserSingleComponent
              data={curMsg}
              handleRoomClick={onRoomClickHandler}
              key={curMsg.msgId}
            />
          );
        })}
      </div>
      <FindUserModal
        open={open}
        handleChangeFindUser={handleChangeFindUser}
        dismissModal={dismissModal}
        inputUser={inputUser}
        searchResult={searchResult}
        onNewMessageClickHandler={onNewMessageClickHandler}
      />
    </div>
  );
});

export default LeftWindow;
