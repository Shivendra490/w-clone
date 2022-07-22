import React, { useState } from "react";
import { registerUser } from "../api/Login";
import CustomizedSnackbars from "../AtomComponents/CustomizedSnackars";
import "./RegisterLogin.css";

const Register = (props) => {
  const [registerUserDetails, setRegisterUserDetails] = useState({
    userName: "",
    phone: "",
    password: "",
  });

  const [snack,setSnack]=useState('')

  // const handleRegisterSubmit = () => {
  //   registerUser(registerUserDetails);
  // };

  const handleRegisterSubmit = async() => {
    try{
     const response= await registerUser(registerUserDetails);
     console.log('responsehkh jjjjjjjj',response)
     if (response && response.status==='success'){
      setSnack(response.status)
      // setUserId(response.data)
      // navigate('Wcomp')
     }
     else{
      console.log('29 mess',response.msg)//toast
      setSnack(response.msg)
      
     }
    }
    catch(error){
      console.log('35error')
      setSnack(error.message)
    }
  };


  const userInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterUserDetails({ ...registerUserDetails, [name]: value });
  };
  return (
    <>
    {snack && <CustomizedSnackbars msg={snack} setSnackErr={setSnack}/>}
      {/* <div className="mainWrapper">
      <div className="registerWrapper"> */}
      <div className="fieldComponentWrapper">
        <div className="fieldName">Username</div>
        <div className="input">
          <input
            type="text"
            name="userName"
            value={registerUserDetails.userName}
            onChange={userInputChange}
            placeholder="enter username"
            style={{ height: "3em" }}
          />
        </div>
      </div>

      <div className="fieldComponentWrapper">
        <div className="fieldName">Phone</div>
        <div className="input">
          <input
            type="text"
            name="phone"
            value={registerUserDetails.phone}
            onChange={userInputChange}
            placeholder="enter username"
            style={{ height: "3em" }}
          />
        </div>
      </div>

      <div className="fieldComponentWrapper">
        <div className="fieldName">Password</div>
        <div className="input">
          <input
            type="text"
            name="password"
            value={registerUserDetails.password}
            onChange={userInputChange}
            placeholder="enter username"
            style={{ height: "3em" }}
          />
        </div>
      </div>

      <div className="fieldCompnentWrapper">
        <div className="btn">
          <button
            style={{ width: "100%", backgroundColor: "blue", height: "3em" }}
            onClick={handleRegisterSubmit}
          >
            Register
          </button>
        </div>
      </div>

      <div className="fieldCompnentWrapper">
        <div className="btn">
          <button
            style={{ width: "100%", backgroundColor: "blue", height: "2em" ,marginTop:'10px'}}
            onClick={() => props.setValue("1")}
          >
            already account
          </button>
        </div>
      </div>

      {/* <div className="fieldComponentWrapper">
        <div className="btn">
          <button style={{ width: "100%", backgroundColor: "blue", height: "3em" }} onClick={() => props.setValue("1")}>
            already account
          </button>
        </div>
      </div> */}
      {/* </div>
    </div> */}
    </>
  );
};

export default Register;
