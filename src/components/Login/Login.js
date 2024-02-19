import React, { useContext } from "react";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import userloginValidationSchema from "./userloginValidationSchema";
import { AuthContext } from "../Context/authContext";

// import { AuthContext } from "../Context/authContext";

export default function Login() {

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const initialState = {
        username: "",
        password: "",
    };
    
    // const { login } = useContext(AuthContext);
    const [inputs, setInputs] = useState(initialState)
    const [err, setErr] = useState({});
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();
  
    
    const handleChange = (e) => {

      setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
         // Clearing the error message when user starts typing

    };


    const handleSubmit =  async (event) => {
        event.preventDefault();
        try {
           await login(inputs)
          // if (response.status === 200) {
            navigate("/providerlist")
        } catch (err) {
          // setErr(err.response.data)
        }
      }
        
              
 
  return (
    <div>
     
       
        <div>
        <h1>WELCOME BACK - LOG IN</h1>
      </div>
      {/* <ToastContainer/> */}
      <form action="" className="form" onSubmit={handleSubmit}>
            <div className ="form__usernamewrap">
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Enter Username" name="username" className="form__username" id="username" value={inputs.username} onChange={handleChange}  />
        {/* {errors.username && <span>{errors.username}</span>} */}
        </div>

        <div className ="form__passwordwrap">
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter Password" name="password" className="form__password" id="password" value={inputs.password} onChange={handleChange}  />
       
        </div>
        <div className="form__newuser"> <p className="form__newusertext"> New Provider ?</p> 
        <p className="form__login" onClick={() => navigate("/signup")}>Sign Up</p></div>
        <button className="form__submit" type="submit">Log In</button>
        {/* {err && err} */}
      </form>
    </div>
  );
}


