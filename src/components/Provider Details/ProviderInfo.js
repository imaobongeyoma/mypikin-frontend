//my daycare list component js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import deleteicon from "../../assets/icons/delete_outline-24px.svg";
import editicon from "../../assets/icons/edit-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import { AuthContext } from "../Context/authContext";
import { useContext } from "react";
import Wrapper from "../Wrapper/Wrapper";

export default function Provider() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [selectedProvider, setSelectedProvider] = useState([]);
  const [user, setUser] = useState([]);

  const { providerid } = useParams();
  //   const { userid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  //  console.log(currentUser.role)

  // Fetch full details of selected daycare  from the API
  const fetchSelectedprovider = async (id) => {
    try {
      const response = await axios.get(`${SERVER_URL}/users/${id}/daycare`);
      setSelectedProvider(response.data);
      setUser(response.data[0].provider_id);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching daycare details:", error);
    }
  };

  useEffect(() => {
    fetchSelectedprovider(providerid);
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
      <h1> Details</h1>

      {Object.entries(groupedProviders).map(([provider_id, provider]) => (
        <div key={provider_id}>
          {currentUser.id === provider.provider_id ? (
            <div>
              <p>First Name: {provider.first_name}</p>
              <p>Last Name : {provider.last_name}</p>
              {currentUser && currentUser.role === "Admin" && (
                <div>
                  <img src={editicon} alt="editicon"></img>
                  <img
                    onClick={DeleteUser}
                    src={deleteicon}
                    alt="editicon"
                  ></img>
                </div>
              )}
              {currentUser &&
                currentUser.role !== "Admin" &&
                currentUser.first_name === provider.first_name && (
                  <div>
                    <img src={editicon} alt="editicon"></img>
                  </div>
                )}
            </div>
          ) : (
            <div>
              <div>You are not authorized to view this page. </div>
              <Link to={`/user/${currentUser.id}`}><button>View Your Profile</button></Link>
            </div>
          )}
        </div>
      ))}
    </Wrapper>
  );
}
