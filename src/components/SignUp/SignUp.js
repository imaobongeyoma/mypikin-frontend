import React from "react";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import userValidationSchema from "./signupvalidation";
import Wrapper from "../Wrapper/Wrapper";

export default function SignUp() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhonenumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [file, setFile] = useState();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  //
  const upload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("phone_number", phone_number);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("file", file);
    axios
      .post("http://localhost:8081/auth/register", formData)
      .then((response) => {
        console.log(response);
        if (response.data.status === "Success") {
          setMsg("File Successfully Uploaded");
          
        } else {
          setMsg("Error");
        }
        navigate("/login")
      })
      .catch((er) => console.log(er));
  };

  return (
    <Wrapper>
      <div>
        <h1>PROVIDE CARE - SIGNUP</h1>
      </div>
      <form action="" className="form" onSubmit={upload}>
        <div className="form__fnwrap">
          <label htmlFor="first_name">Firstname</label>
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            className="form__first-name"
            id="first_name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form__lnwrap">
          <label htmlFor="last_name">Lastname</label>
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            className="form__last-name"
            id="last_name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form__emailwrap">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="form__email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form__phonewrap">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            placeholder="Phone number"
            name="phone_number"
            className="form__phone"
            id="phone"
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>

        <div className="form__usernamewrap">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            className="form__username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form__passwordwrap">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            className="form__password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__image">
          <label htmlFor="profile" className="form-label">Profile pic</label>
          <input
            className="form-control form-control-lg"
            type="file" name="file" id="profile"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="form__hasacc">
          {" "}
          <p className="hassacc text">Already have an account?</p>
          <p className="form__login" onClick={() => navigate("/login")}>
            {" "} 
            Log in
          </p>
        </div>
        <button className="form__submit" type="submit">
          Sign Up
        </button>
      </form>
      </Wrapper>
  );
}
