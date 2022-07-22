import React from "react";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { milliToStandardTime } from "../api/Chat/TimeManipulate";
import { getUserDetails } from "../api/LocalStorage";
import TickStatus from "./TickStatus";

const Body = ({ chatMessages, currentUserId }) => {
  // console.log('cm',Object.keys(chatMessages)[0])
  // console.log('cm',chatMessages[Object.keys(chatMessages)[0]])
  // console.log("body9", chatMessages, currentUserId);

  // {key1:[{},{},{}],key2:[],...}
  const currentUserMsg = chatMessages[currentUserId];
  

  // const keyArray=Object.keys(chatMessages)
  // ['key1','key2',....]
  const userSenderId=getUserDetails().userId

  return (

    


    // <div className="chat">
    // <span>Hi</span>
    //   <div className="tickTimeWrapper">
        
    //     <span>12:30 PM</span>
    //   </div>
    // </div>

    // <div className="chat chatRight">
    // <span>How are you?</span>
    //   <div className="tickTimeWrapper">
    //   <span>12:30 PM</span>
    //     <span className='rightDoubleTick'><DoneAllOutlinedIcon style={{fontSize:'small'}}/></span>
        
    //   </div>
    // </div>







    <div className="chatWrapper">
      <div className="chatLeftRightwrapper">{currentUserId && chatMessages[currentUserId] && chatMessages[currentUserId].map((singleMsg)=>{
        return <div className={`chat ${singleMsg.senderId===userSenderId ? "chatRight" : ""}`}>
        <span>{singleMsg.message}</span>
          <div className="tickTimeWrapper">
          <span>{milliToStandardTime(singleMsg.createdAt)}</span>
          {singleMsg.senderId===userSenderId && <span className='rightDoubleTick'>{<TickStatus status={singleMsg.status}/>}</span>}
            </div>
            </div>
      })}
      </div>
      </div>
  )
    }


export default Body;
