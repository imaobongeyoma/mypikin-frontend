import React from "react";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import userValidationSchema from "./signupvalidation";

export default function SignUp() {

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const initialState = {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
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
            await userValidationSchema.validate(userData, {
              abortEarly: false,
            });

            const response = await axios.post(`http://localhost:8081/users`, userData);

              if (response.status === 201) {
                setUserData(initialState);
                toast.success("User was added successfully!");
                navigate(`/login`)
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
          "Sorry, the user could not be added successfully. Please try again later."
        );
      }
    }

    }
  return (
    <div>
     
       
        <div>
        <h1>Provide Care</h1>
      </div>
      <ToastContainer/>
      <form action="" className="form" onSubmit={handleSubmit}>
        <div className ="form__fnwrap">
        <label htmlFor="first_name">Firstname</label>
        <input type="text" placeholder="First Name" name="first_name" className="form__first-name" id="first_name" value={userData.first_name}  onChange={handleChange} />
        {errors.first_name && <span>{errors.first_name}</span>}
        </div>

        <div className ="form__lnwrap">
        <label htmlFor="last_name">Lastname</label>
        <input type="text" placeholder="Last Name" name="last_name" className="form__last-name" id="last_name" value={userData.last_name} onChange={handleChange} />
        {errors.last_name && <span>{errors.last_name}</span>}
        </div>

        <div className ="form__emailwrap">
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="Email" name="email" className="form__email" id="email" value={userData.email} onChange={handleChange}  />
        {errors.email && <span>{errors.email}</span>}
        </div>


        <div className ="form__phonewrap">
        <label htmlFor="phone">Phone Number</label>
        <input type="text" placeholder="Phone number" name="phone_number" className="form__phone" id="phone" value={userData.phone_number} onChange={handleChange}  />
        {errors.phone_number && <span>{errors.phone_number}</span>}
        </div>

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
        <div className="form__hasacc"> <p className="hassacc text">Already have an account?</p> 
        <p className="form__login" onClick={() => navigate("/login")}> Log in</p></div>
        <button className="form__submit" type="submit">Sign Up</button>
      </form>
    </div>
  );
}


