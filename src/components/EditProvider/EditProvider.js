import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import Wrapper from "../Wrapper/Wrapper";
import { Link } from "react-router-dom";
import "./EditProvider.scss";

export default function EditUser() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    username: "",
    password: "",
    background_check_done: "",
    role: "",
    profile_image: null,
  });

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "profile_image") {       
        setFormData({ ...formData, [e.target.name]: e.target.files[0]  });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/users/${id}/`);
      setFormData({
        ...formData,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        phone_number: response.data.phone_number,
        email: response.data.email,
        username: response.data.username,
        password: response.data.password,
        background_check_done: response.data.background_check_done,
        role: response.data.role,
        profile_image: response.data.profile_image,
      });
      
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataTOSend = new FormData();
    formDataTOSend.append("first_name", formData.first_name);
    formDataTOSend.append("last_name", formData.last_name);
    formDataTOSend.append("phone_number", formData.phone_number);
    formDataTOSend.append("email", formData.email);
    formDataTOSend.append("username", formData.username);
    formDataTOSend.append("password", formData.password);
    formDataTOSend.append( "background_check_done",formData.background_check_done);
    formDataTOSend.append("role", formData.role);
    formDataTOSend.append("profile_image", formData.profile_image);

    try  
    { await axios.put(`http://localhost:8081/users/${id}`, formDataTOSend, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
        
      });
      navigate("/login");
    }

    catch (error) {
        console.error('Error Updating profile', error)
    }
  }


  if (!currentUser) {
    return (
      <main>
        Please sign up or log in if you own this profile.
        <Link to="/signup">
          {" "}
          <div>Sign Up</div>
        </Link>
        <Link to="/login">
          {" "}
          <div>Log In</div>
        </Link>
      </main>
    );
  }
  return (
    <>
    <Wrapper>
        {currentUser.first_name === formData.first_name || currentUser.role === "Admin" ? (
      <div className="sform">
        <div className="sform__heading sform__margin">
          <h1 className="sform__title">Edit Profile</h1>
        </div>

        <form action="" className="form" onSubmit={handleSubmit}>
          <div className="form__stylewrap">
            <div className="form__fnwrap form__inputwrap">
              <label htmlFor="first_name" className="form__label">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                value={formData.first_name}
                name="first_name"
                className="form__first-name form__field"
                id="first_name"
                onChange={handleChange}
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
                value={formData.last_name}
                className="form__last-name form__field "
                id="last_name"
                onChange={handleChange}
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
                value={formData.email}
                className="form__email form__field"
                id="email"
                onChange={handleChange}
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
                value={formData.phone_number}
                className="form__phone form__field"
                id="phone"
                onChange={handleChange}
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
                value={formData.username}
                className="form__username form__field"
                id="username"
                onChange={handleChange}
              />
            </div>
            {currentUser && currentUser.first_name === formData.first_name && (
            <div className="form__passwordwrap form__inputwrap">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                type="text"
                placeholder="password"
                name="password"
                value={formData.password}
                className="form__password form__field"
                id="password"
                onChange={handleChange}
              />
            </div>
            )}

            {currentUser && currentUser.role === "Admin" && (
              <div className="form__backgroundwrap form__inputwrap">
                <label htmlFor="background_check_done" className="form__label">
                  Background Check Done?
                </label>
                <input
                  type="text"
                  placeholder="Is Background Check Done?"
                  name="background_check_done"
                  value={formData.background_check_done}
                  className="form__bgcheck form__field"
                  id="background_check_done"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          
          <div className="form__stylewrap">
          {currentUser && currentUser.role === "Admin" && (
            <div className="form__rolewrap form__inputwrap">
              <label htmlFor="role" className="form__label">
                User's role
              </label>
              <input
                type="text"
                placeholder="User's role?"
                name="role"
                value={formData.role}
                className="form__role form__field"
                id="role"
                onChange={handleChange}
              />
            </div>)}

            <div className="form__image form__inputwrap">
              <label htmlFor="profile" className="form__label">
                Profile Image
              </label>
              <input
                className="form-control form-control-lg form__field-image"
                type="file"
                name="profile_image"
                id="profile"
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="form__submit" type="submit">
            Update
          </button>
        </form>
      </div>

        ):
        (
        
                <div className ="access"> 
  
        <h2> You are allowed to update this user. Please visit your profile.</h2>
        <div className="access__btns">
        <Link to={`/user/${currentUser.id}`}><button className="access__profilebtn access__btn ">Your Profile </button></Link>
        <Link to="/"> <button className="access__homebtn access__btn">Home</button></Link>
        </div>

     </div>
         )} 
    </Wrapper>
    </>
  );
}
