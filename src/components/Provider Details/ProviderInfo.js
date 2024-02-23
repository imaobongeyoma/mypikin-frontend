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
      const [response, providerOnly] = await Promise.all
      ([
        axios.get(`${SERVER_URL}/users/${id}/daycare`),
        axios.get(`${SERVER_URL}/users/${id}`) ])
      setSelectedProvider(response.data);
      // setGroupedProvider(response.data[0].provider_id);
      setUser(providerOnly.data)
      console.log(providerOnly.data);
      
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
      <h1> Details</h1>
{Object.keys(groupedProviders).length === 0 ? (
  <div>
  <div>{user.username}</div>
  <div>{user.password}</div>
  <div>{user.first_name}</div>
  <div>{user.last_name}</div>
  <><img src={`${SERVER_URL}/${user.profile_image}`}></img></>
  </div>
) :
(
      Object.entries(groupedProviders).map(([provider_id, provider]) => (
        <div key={provider_id}>
          {provider && currentUser && currentUser.id === provider.provider_id ? (
            <div>
              <p>First Name: {provider.first_name}</p>
              <p>Last Name : {provider.last_name}</p>
              <div className="picture">
              <img
                src={`${SERVER_URL}${provider.profile_image}`}
                className="profileimage"
              ></img>
              <div>{provider.username}</div>
            </div>
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
      )))}
    </Wrapper>
  );
}
