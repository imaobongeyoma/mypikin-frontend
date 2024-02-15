import React from "react";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import userloginValidationSchema from "./userloginValidationSchema";

export default function SignUp() {

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const initialState = {
        username: "",
        password: "",
    };
    const [userData, setUserData] = useState(initialState)
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({ ...userData, [name]: value});
         // Clearing the error message when user starts typing
         setErrors({ ...errors, [name]: ""});
    };


    const handleSubmit =  async (event) => {
        event.preventDefault();
        try {
            await userloginValidationSchema.validate(userData, {
              abortEarly: false,
            });

            const response = await axios.post(`http://localhost:8081/users`, userData);

              if (response.status === 201) {
                setUserData(initialState);
                toast.success("User was added successfully!");
                navigate(`/`)
              }
              
    } catch (err) {
      if (err.name === "ValidationError") {
        // Setting errors, if form input is invalid:
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Form submission error:", err);
        toast.error(
          "Sorry, could not log in. Please try again later."
        );
      }
    }

    }
  return (
    <div>
     
       
        <div>
        <h1>Welcome Back</h1>
      </div>
      <ToastContainer/>
      <form action="" className="form" onSubmit={handleSubmit}>
            <div className ="form__usernamewrap">
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Enter Username" name="username" className="form__username" id="username" value={userData.username} onChange={handleChange}  />
        {errors.username && <span>{errors.username}</span>}
        </div>

        <div className ="form__passwordwrap">
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter Password" name="password" className="form__password" id="password" value={userData.password} error={errors.password} onChange={handleChange}  />
        {errors.password && <span>{errors.password}</span>}
        </div>
        <div className="form__newuser"> <p className="form__newusertext"> New Provider ?</p> 
        <p className="form__login" onClick={() => navigate("/signup")}>Sign Up</p></div>
        <button className="form__submit" type="submit">Log In</button>
      </form>
    </div>
  );
}


