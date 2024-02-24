//my daycare list component js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import deleteicon from "../../assets/icons/deleteicon.png";
import editicon from "../../assets/icons/editicon.png";
import sort from "../../assets/icons/sort-24px.svg";
import { AuthContext } from "../Context/authContext";
import { useContext } from "react";
import Wrapper from "../Wrapper/Wrapper";
import "./ProviderInfo.scss"; 
export default function Provider() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [selectedProvider, setSelectedProvider] = useState([]);
  const [groupedProvider, setGroupedProvider] = useState([]);
  const [user, setUser] = useState([]);
  // const [providerOnly, setproviderOnly]= useState([])

  const { providerid } = useParams();
  // const {provideronlyid} = useParams()
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
      // setGroupedProvider(response.data[0].provider_id);
      setUser(providerOnly.data);
      console.log(providerOnly.data);
      console.log(response.data.length);
    } catch (error) {
      console.error("Error fetching daycare details:", error);
    }
  };

  useEffect(() => {
    fetchData(providerid);
  }, [providerid]);

  if (!selectedProvider || !currentUser) {
    return <div>Loading...</div>;
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
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <h1 className="title"> Details</h1>
      {Object.keys(groupedProviders).length === 0 ? (
        <div className="details">
          <div className="details__profcont">
            <img
              src={`${SERVER_URL}/${user.profile_image}`}
              className="details__profileimage"
            ></img>
          </div>
          <div className="details__detail">Username: {user.username}</div>
          <div className="details__detail">First Name: {user.first_name}</div>
          <div className="details__detail">Last Name: {user.last_name}</div>
          <div className="details__detail">Role: {user.role}</div>
          <button onClick={() =>
                    navigate(`/users/${currentUser.id}/createdaycare`)
                  }>Create a daycare </button>
        </div>
      ) : (
        Object.entries(groupedProviders).map(([provider_id, provider]) => (
          <div key={provider_id}>
            {provider &&
            currentUser &&
            currentUser.id === provider.provider_id ? (
              <div className="details">
                <div className="details__profcont">
                  <img
                    src={`${SERVER_URL}/${user.profile_image}`}
                    className="details__profileimage"
                  ></img>
                </div>
                <div className="details__detail">Username: {provider.username}</div>
                <div className="details__detail">
                  First Name: {provider.first_name}
                </div>

                <div className="details__detail">
                  Last Name: {provider.last_name}
                </div>
                <div className="details__detail">Role: {provider.role}</div>

                {currentUser && currentUser.role === "Admin" && (
                  <div>
                    <img src={editicon} alt="editicon" onClick={() =>
                    navigate(`/daycares/${provider.daycare_id}/edit`)
                  }></img>
                    <img
                      onClick={DeleteUser}
                      src={deleteicon}
                      alt="deleteicon"
                    ></img>
                  </div>
                )}
                {currentUser &&
                  currentUser.role !== "Admin" &&
                  currentUser.first_name === provider.first_name && (
                    <div>
                      <img src={editicon} alt="editicon" onClick={() =>
                    navigate(`/user/${provider.provider_id}/edit`)
                  }></img>
                    </div>
                  )}
              </div>
            ) : (
              <div>
                <div>You are not authorized to view this page. </div>
                <Link to={`/user/${currentUser.id}`}>
                  <button>View Your Profile</button>
                </Link>
              </div>
            )}
            <h2>Your Daycare</h2>
            <p>{provider.name}</p>
            <div>
            <button onClick={() =>
                    navigate(`/daycares/${provider.daycare_id}/info`)
                  }>View Details</button>


            <button onClick={() =>
                    navigate(`/daycares/${provider.daycare_id}/edit`)
                  }>Edit</button>
          </div>
          </div>
        ))
      )}
    </Wrapper>
  );
}
