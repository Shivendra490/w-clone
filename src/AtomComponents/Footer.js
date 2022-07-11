import React from 'react'
import SendIcon from '@mui/icons-material/Send';

const Footer = ({inputMsg,SetInputMsg,submitHandler}) => {
  return (
    <div className="chatInputWrapper">
          <input
            type="text"
            className="chatInput"
            placeholder="Enter your message here"
            value={inputMsg}
            onChange={(e) => SetInputMsg(e.target.value)}
          />
          <div className="button">
            <button
              style={{ width: "100%", height: "100%",backgroundColor: 'green',
              borderRadius: '50px' }}
              onClick={submitHandler}
            >
             <SendIcon style={{color:"white"}}/> 
            </button>
          </div>
        </div>
  )
}

export default Footer