import { Avatar } from '@mui/material'
import React from 'react'
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const UnitSearchedComponent = ({searchResult,sendMsgToNewUser}) => {
    
  return (
    <div
              className="searchedUserWrapper"
              style={{
                border:'1px solid black',
                borderRadius:'5px',
                padding:'5px',
                display: "flex",
                height: "60px",
                // width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {searchResult.status==='success' ?
              <>
              <div
              className="userAvatarNameWrapper"
              style={{
                display: "flex",
                gap: "6px",
                alignItems: "center",

                padding: "2%",
                border: "1px solid grey",
                borderRadius: "10px",
                maxWidth: "60%",
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
                  <h4>{searchResult.data.phone}</h4>
                </div>
                <div className="classUserName" style={{ color: "grey" }}>
                  <h6
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      maxWidth: "90%",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {searchResult.data.username}
                  </h6>
                </div>
              </div>
            </div>
            <div className="messageWrite" onClick={()=>sendMsgToNewUser(searchResult)}>
              <span>
                <EmailOutlinedIcon style={{ fontSize: "2rem" }} />
              </span>
            </div>
            </>:
            
            <span>{searchResult.msg}</span>
              
              }

              
            </div>
  )
}

export default UnitSearchedComponent