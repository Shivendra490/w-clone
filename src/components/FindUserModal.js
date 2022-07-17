import { Avatar, Modal } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const FindUserModal = ({
  open,
  dismissModal,
  inputUser,
  handleChangeFindUser,
  searchResult,
}) => {
  return (
    <Modal open={open}>
      <div className="childModal">
        <div
          className="cross"
          style={{ width: "100%", display: "grid", justifyContent: "end" }}
        >
          <CloseIcon onClick={dismissModal} />
        </div>
        <div
          className="cardWrapper"
          style={{
            display: "flex",
            width: "100%",
            boxSizing: "border-box",
            flexDirection: "column",
            padding: "0 16px 16px 16px",
            justifyContent: "space-around",
          }}
        >
          <h2 style={{ paddingBottom: "8px" }}>Search Users</h2>
          <input
            type="text"
            placeholder="search here"
            value={inputUser}
            onChange={handleChangeFindUser}
            style={{
              borderRadius: "20px",
              height: "40px",
              width: "100%",
              textAlign: "center",
            }}
          />
          <div
            className="searchedUserWrapper"
            style={{ display: "flex", height: "60px", width: "100%" }}
          >
            <div
              className="userAvatarNameWrapper"
              style={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                marginTop: "3%",
                padding: "2%",
                border: "1px solid grey",
                borderRadius: "10px",
              }}
            >
              <div className="userAvatar">
                <Avatar />
              </div>
              <div
                className="classUserNamePhoneWrapper"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="classPhone">
                  <h4>{searchResult.phone}</h4>
                </div>
                <div className="classUserName" style={{ color: "grey" }}>
                  <h6>{searchResult.username}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FindUserModal;
