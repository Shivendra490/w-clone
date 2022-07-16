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

  export {findUser}