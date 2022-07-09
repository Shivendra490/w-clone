import React from 'react'

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
              style={{ width: "100%", height: "100%" }}
              onClick={submitHandler}
            >
              send
            </button>
          </div>
        </div>
  )
}

export default Footer