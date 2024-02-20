import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import userloginValidationSchema from "./userloginValidationSchema";
import { AuthContext } from "../Context/authContext";
import Wrapper from "../Wrapper/Wrapper";

// import { AuthContext } from "../Context/authContext";

export default function Login() {
  const { currentUser } = useContext(AuthContext);
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
            // navigate(`/user/${currentUser.id}`)
            // window.location.href ="/";
        } catch (err) {
          // setErr(err.response.data)
        }
      }
      

      // if (currentUser) {
      //   return (
      //       <main> 
      //           You are logged in - redirecting ...
      //           <Link to={`/user/${currentUser.id}`}> View Your Profile</Link>
      
      //       </main>
      //   )
      //   }
      useEffect(() => {
        if (currentUser) {
          navigate(`/user/${currentUser.id}`);
        }
      }, [currentUser, navigate]);
              
 
  return (
    
     <Wrapper>
       
        <div>
        <h1>WELCOME BACK - LOG IN</h1>
      </div>
     
      <form action="" className="form" onSubmit={handleSubmit}>
            <div className ="form__usernamewrap">
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Enter Username" name="username" className="form__username" id="username" value={inputs.username} onChange={handleChange}  />
   
        </div>

        <div className ="form__passwordwrap">
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter Password" name="password" className="form__password" id="password" value={inputs.password} onChange={handleChange}  />
       
        </div>
        <div className="form__newuser"> <p className="form__newusertext"> New Provider ?</p> 
        {/* <p className="form__login" onClick={() => navigate("/signup")}>Sign Up</p> */}
        <button className="form__signup" onClick={() => navigate("/signup")}>Signup</button>
        </div>
        {/* <button className="form__signup" onClick={() => navigate("/signup")}>Log In</button> */}
        <button className="form__submit" type="submit">Log In</button>
      </form>
      </Wrapper>
  );
}


