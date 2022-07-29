import React from 'react'
import UnitSearchedComponent from './UnitSearchedComponent'
import CloseIcon from "@mui/icons-material/Close";

const ModalChilds = ({dismissModal,handleChangeFindUser,inputUser,searchResult,sendMsgToNewUser}) => {
  return (
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
              gap: "25px",
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
            {<UnitSearchedComponent searchResult={searchResult} sendMsgToNewUser={sendMsgToNewUser}/>}
          </div>
        </div>
  )
}

export default ModalChilds