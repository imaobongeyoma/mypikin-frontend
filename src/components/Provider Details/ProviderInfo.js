import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import deleteicon from "../../assets/icons/deleteicon.png";
import editicon from "../../assets/icons/editicon.png";
import hero from "../../assets/icons/hero.jpg";
import { AuthContext } from "../Context/authContext";
import { useContext } from "react";
import Wrapper from "../Wrapper/Wrapper";
import "./ProviderInfo.scss";
export default function ProviderInfo() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [selectedProvider, setSelectedProvider] = useState([]);
  const [user, setUser] = useState([]);

  const { providerid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  // Fetch full details of selected daycare  from the API
  const fetchData = async (id) => {
    try {
      const [response, providerOnly] = await Promise.all([
        axios.get(`${SERVER_URL}/users/${id}/daycare`),
        axios.get(`${SERVER_URL}/users/${id}`),
      ]);
      setSelectedProvider(response.data);
      setUser(providerOnly.data);
    } catch (error) {
      console.error("Error fetching daycare details:", error);
    }
  };

  useEffect(() => {
    fetchData(providerid);
  }, [providerid]);

  if (!selectedProvider || !currentUser) {
    return <Wrapper> <div className="wronguser">Please ensure you are trying to access your own account</div></Wrapper>
  }

  const groupedProviders = selectedProvider.reduce((acc, provider) => {
    if (!acc[provider.provider_id]) {
      acc[provider.provider_id] = {
        ...provider,
        daycarephotos: [`${SERVER_URL}${provider.daycarephoto}`],
      };
    } else {
      acc[provider.provider_id].daycarephotos.push(
        `${SERVER_URL}${provider.daycarephoto}`
      );
    }
    return acc;
  }, {});

  const DeleteUser = async () => {
    try {
      const res = await axios.delete(`${SERVER_URL}/users/${user}`);
      setUser(res.data);
      navigate("/daycarelist");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Wrapper>
      <section className="hero">
      <div className="hero__imgcont">
            <img
              src={hero}
              className="hero__img"
              alt="heroimage"
            ></img>
          </div>
      </section>

      <section className="details">
     
        <div className="details__titlecont">
          <h1 className="details__title"> Your Profile Details</h1>
        </div>
        {Object.keys(groupedProviders).length === 0 ? (
          <>
          <div className="details__editprofile">
            <div className="details__profcont">
              <img
                src={`${SERVER_URL}/${user.profile_image}`}
                className="details__profileimage"
                alt="profileimage"
              ></img>
            </div>
            <div onClick={() => navigate(`/user/${user.id}/edit`)} className="hover-pointer details__edit"> 
            <p>Edit your profile</p>
              <div className="details__iconcont"><img
                src={editicon}
                alt="editicon"
                className="details__icon"
              ></img>
              </div>
            </div>
            </div>
            <div className="details__detail">Username: <span className="details__span">{user.username}</span></div>
            <div className="details__detail">First Name: <span className="details__span">{user.first_name}</span></div>
            <div className="details__detail">Last Name: <span className="details__span">{user.last_name}</span></div>
            <div className="details__detail">Role: <span className="details__span">{user.role}</span></div>
            <div className="details__detail">Background Check Approved: <span className="details__span">{user.background_check_done}</span></div>
            
            <button className="details__createdaycare"
              onClick={() => navigate(`/user/${currentUser.id}/createdaycare`)}
            >
              Create a daycare
            </button>
          </>
        ) : (
          Object.entries(groupedProviders).map(([provider_id, provider]) => (
            <div key={provider_id}>
              {provider &&
              currentUser &&
              currentUser.id === provider.provider_id ? (
                <>
                  <div className="details__editprofile">
            <div className="details__profcont">
              <img
                src={`${SERVER_URL}/${provider.profile_image}`}
                className="details__profileimage"
                alt="profileimage"
              ></img>
            </div>
            <div onClick={() => navigate(`/user/${user.id}/edit`)} className="hover-pointer details__edit"> 
            <p>Edit your profile</p>
            <div className="details__iconcont">
              <img
                src={editicon}
                alt="editicon"
                onClick={() => navigate(`/user/${provider.provider_id}/edit`)}
                className="details__icon"
              ></img>
              </div>
            </div>
            </div>
            <div className="details__detail">Username: <span className="details__span">{provider.username}</span></div>
            <div className="details__detail">First Name: <span className="details__span">{provider.first_name}</span></div>
            <div className="details__detail">Last Name: <span className="details__span">{provider.last_name}</span></div>
            <div className="details__detail">Role: <span className="details__span">{provider.role}</span></div>
            <div className="details__detail">Background Check Approved: <span className="details__span">{provider.background_check_done}</span></div>

                  {currentUser && currentUser.role === "Admin" && (
                    <div>
                      <img
                        src={editicon}
                        alt="editicon"
                        onClick={() =>
                          navigate(`/daycares/${provider.daycare_id}/edit`)
                        }
                      ></img>
                      <img
                        onClick={DeleteUser}
                        src={deleteicon}
                        alt="deleteicon"
                      ></img>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <div>You are not authorized to view this page. </div>
                  <Link to={`/user/${currentUser.id}`}>
                    <button>View Your Profile</button>
                  </Link>
                </div>
              )}
              <hr className = "details__divider"></hr>
              <h2>Your Daycare Details</h2>
              <div className="details__detail">Daycare Name: <span className="details__span">{provider.name}</span></div>
              <div className= "details__buttons">
                <button
                className= "details__button"
                  onClick={() =>
                    navigate(`/daycares/${provider.daycare_id}/info`)
                  }
                >
                  View Details
                </button>

                <button
                className= "details__button"
                  onClick={() =>
                    navigate(`/daycares/${provider.daycare_id}/edit`)
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </Wrapper>
  );
}
