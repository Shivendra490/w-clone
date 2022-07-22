const findUser = async ( phone) => {
    
    try {
      const body = JSON.stringify({ phone});
  
      const res = await fetch(`https://w-clone-backend.herokuapp.com/searchUser`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: body,
        // mode:'no-cors'
      });
      const data = await res.json();
      console.log('wcompchatapi',data)
      return data;
      
    } catch (error) {
      throw new Error("internal server error")
      
    }
  };

  const getLastMessages = async ( userId) => {
    
    try {
      
      const body = JSON.stringify({ userId});
  
      const res = await fetch(`https://w-clone-backend.herokuapp.com/getLastConversations`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: body,
        
      });
      const data = await res.json();
      console.log(data)
      return data;
      
    } catch (error) {
      throw new Error("internal server error")
      
    }
  };


  const getRoomId = async ( senderId,receiverId) => {
    
    try {
      
      const body = JSON.stringify({ senderId,receiverId});
  
      const res = await fetch(`https://w-clone-backend.herokuapp.com/getRoomById`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: body,
        
      });
      const data = await res.json();
      console.log(data)
      return data;
      
    } catch (error) {
      throw new Error("internal server error")
      
    }
  };


  const sendMessage = async (msgObj) => {
    
    try {
      console.log(msgObj,'71');
      
      const body = JSON.stringify(msgObj);
  
      const res = await fetch(`https://w-clone-backend.herokuapp.com/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: body,
        
      });
      const data = await res.json();
      console.log(data)
      return data;
      
    } catch (error) {
      throw new Error("internal server error")
      
    }
  };


  

  export {findUser,getLastMessages,getRoomId,sendMessage}