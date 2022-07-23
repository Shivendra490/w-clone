import React, { useState } from "react";
import "./Wcomp.css";
import { findUser } from "../../api/Chat";
import FindUserModal from "./components/Modals/FindUserModal";
import RightWindow from "./components/RightWindow";
import LeftWindow from "./components/LeftWindow";

const Wcomp = () => {
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
      const response = await findUser(value);
      if (response && response.status === "success") {
        setSearchResult(response.data);
      }
    }
  };

  const handleNewMessageClick = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const dismissModal = () => {
    setOpen(false);
  };

  return (
    <div className="left-right-wrapper">
      <LeftWindow handleNewMessageClick={handleNewMessageClick} />
      <FindUserModal
        open={open}
        handleChangeFindUser={handleChangeFindUser}
        dismissModal={dismissModal}
        inputUser={inputUser}
        searchResult={searchResult}
      />
      <RightWindow />
    </div>
  );
};

export default Wcomp;
