import React, { useCallback } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { debounce } from '@mui/material';
import { useChatMsgContext } from '../Providers/ChatMsgProvider/context';


const Footer = ({inputMsg,SetInputMsg,submitHandler}) => {

  const {sendTyping}=useChatMsgContext()
    const handleKeyPress=(e)=>{
      // console.log('keypress6',e)
      
      if(e.key ==='Enter' ){
        console.log('13')
        submitHandler()
      }
    }

   const debounceFn=(e)=>{
    SetInputMsg(e.target.value)
    console.log('debounce')
   }

   const onChangeHandler=useCallback(
    
  // debounce(()=>sendTyping(),2000)
  sendTyping()
    
  

   )



  return (
    <div className="chatInputWrapper">
          <input
            type="text"
            className="chatInput"
            placeholder="Enter your message here"
            value={inputMsg}
            onChange={(e) => SetInputMsg(e.target.value)}
            // onChange={(e)=>{SetInputMsg(e.target.value) && onChangeHandler()}}
            
            // onChange={debounce((e)=>{console.log('DEBOUNCE');
            // SetInputMsg(e.target.value)},5000)}
            onKeyPress={handleKeyPress}
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