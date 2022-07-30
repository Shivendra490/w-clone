import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserInLocalStorage } from "../../api/LocalStorage";
import { loginUser } from "../../api/Login";
import CustomizedSnackbars from "../../AtomComponents/CustomizedSnackars";
import "./RegisterLogin.css";


const Login = () => {
  const [userDetails, setUserDetails] = useState({phone:'',password:''});
  const [snackErr,setSnackErr]=useState('')
  const navigate=useNavigate()

  const userInputChange=(e)=>{
    const name=e.target.name
    const value=e.target.value;
    setUserDetails({...userDetails,[name]:value})
  }

  


  const handleLoginSubmit = async() => {
    try{
     const response= await loginUser(userDetails);
     if (response && response.status==='success'){
      setUserInLocalStorage(response.data)
      navigate('Wcomp')
     }
     else{
      setSnackErr(response.msg)
      
     }
    }
    catch(error){
      setSnackErr(error.message)
    }
  };
  return (
    <>
        
          {snackErr && <CustomizedSnackbars msg={snackErr} setSnackErr={setSnackErr}/>}
        
        <div className="fieldComponentWrapper">
          <div className="fieldName">Phone</div>
          <div className="input">
            <input
              type="text"
              placeholder="enter Phone Number"
              style={{ height: "3em" }}
              name='phone'
              value={userDetails.phone}
              onChange={userInputChange}
            />
          </div>
        </div>

        <div className="fieldComponentWrapper">
          <div className="fieldName">password</div>
          <div className="input">
            <input
              type="text"
              placeholder="enter Phone Number"
              style={{ height: "3em" }}
              name='password'
              value={userDetails.password}
              onChange={userInputChange}

            />
          </div>
        </div>

        <div className="fieldCompnentWrapper">
          <div className="btn">
            <button
              onClick={handleLoginSubmit}
              style={{ width: "100%", backgroundColor: "blue", height: "3em" }}
            >
              Login
            </button>
          </div>
        </div>
    </>
  );
};

export default Login;
