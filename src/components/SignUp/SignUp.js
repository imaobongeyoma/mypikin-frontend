import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Wrapper from "../Wrapper/Wrapper";
import doubleicon from "../../assets/icons/doubleicon.png";
import "./SignUp.scss";

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
        if (response.data.status === "Success") {
          setMsg("File Successfully Uploaded");
        } else {
          setMsg("Error");
        }
        navigate("/login");
      })
      .catch((er) => console.errorM(er));
  };

  return (
    <Wrapper>
      <div className="sform">
        <div className="sform__heading">
          <h1 className="sform__title">Provide Care</h1>
        </div>
        <div className="sform__ctawrap">
          <img src={doubleicon} alt="doubleicon" className="sform__icon"></img>
          <p className="sform__text">Create an account</p>
        </div>

        <form action="" className="form" onSubmit={upload}>
          <div className="form__stylewrap">
            <div className="form__fnwrap form__inputwrap">
              <label htmlFor="first_name" className="form__label">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                className="form__first-name form__field"
                id="first_name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form__lnwrap form__inputwrap">
              <label htmlFor="last_name" className="form__label">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                className="form__last-name form__field "
                id="last_name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="form__stylewrap">
            <div className="form__emailwrap form__inputwrap">
              <label htmlFor="email" className="form__label">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="form__email form__field"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form__phonewrap form__inputwrap">
              <label htmlFor="phone" className="form__label">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Phone number"
                name="phone_number"
                className="form__phone form__field"
                id="phone"
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </div>
          </div>
          <div className="form__stylewrap">
            <div className="form__usernamewrap form__inputwrap">
              <label htmlFor="username" className="form__label">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="form__username form__field"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form__passwordwrap form__inputwrap">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="form__password form__field"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form__image form__inputwrap">
            <label htmlFor="profile" className="form__label">
              Profile Image
            </label>
            <input
              className="form-control form-control-lg form__field-image"
              type="file"
              name="file"
              id="profile"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <p className="form__terms">
            Signing up means you have read and agree to the Terms of Service and
            our Privacy Policy
          </p>

          <button className="form__submit" type="submit">
            Sign Up
          </button>
          <div className="form__existing">
            <p className="form__accowner">
              Already have an account?
              <span onClick={() => navigate("/login")} className="form__login">
                Log in
              </span>
            </p>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}
