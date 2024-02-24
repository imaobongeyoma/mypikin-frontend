import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/authContext";
import Wrapper from "../Wrapper/Wrapper";
import "../Login/Login.scss"
import doubleicon from "../../assets/icons/doubleicon.png"

export default function Login() {
  const { currentUser } = useContext(AuthContext);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const initialState = {
        username: "",
        password: "",
    };
    
    const [inputs, setInputs] = useState(initialState)
    const [err, setErr] = useState({});
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();
  
    
    const handleChange = (e) => {

      setInputs(prev => ({...prev, [e.target.name]: e.target.value}));

    };


    const handleSubmit =  async (event) => {
        event.preventDefault();
        try {
           await login(inputs);
           if (currentUser && currentUser.role === "Admin") {
            navigate ("/");
           } else if (currentUser) {
            navigate(`/user/${currentUser.id}`)
           }
            
        } catch (err) {
        }
      }
      
      useEffect(() => {
        if (currentUser && currentUser.role === "Admin") {
          navigate ("/");
         } else if (currentUser) {
          navigate(`/user/${currentUser.id}`)
         }
      }, [currentUser, navigate]);
              
 
  return (
    
     <Wrapper>
       
        <div className="sform">
        <div className="sform__heading">
        <h1 className="sform__title"> Welcome</h1>
      </div>
      <div className="sform__ctawrap">
          <img src={doubleicon} alt="doubleicon" className="sform__icon"></img>
          <p className="sform__text">Log into your account</p>
        </div>
      
     
      <form action="" className="form" onSubmit={handleSubmit}>
            <div className ="form__usernamewrap form__inputwrap">
        <label htmlFor="username" className="form__label">Username</label>
        <input type="text" placeholder="Enter Username" name="username" className="form__username form__field" id="username" value={inputs.username} onChange={handleChange}  />
   
        </div>

        <div className ="form__passwordwrap form__inputwrap">
        <label htmlFor="password" className="form__label">Password</label>
        <input type="password" placeholder="Enter Password" name="password" className="form__password form__field" id="password" value={inputs.password} onChange={handleChange}  />
       
        </div>
      
        <button className="form__submit" type="submit">Log In</button>
        <div className="form__existing">
        
          <p className="form__accowner">New Provider? <span onClick={() => navigate("/signup")} className="form__signup">Sign up</span></p>
        </div>
      </form>
      </div>
      </Wrapper>
  );
}


