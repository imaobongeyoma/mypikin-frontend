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

export default function SelectedDaycare() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [selectedDaycare, setSelectedDaycare] = useState([]);
  const [user, setUser] = useState([]);

  const { daycareid } = useParams();
  //   const { userid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  //  console.log(currentUser.role)

  // Fetch full details of selected daycare  from the API
  const fetchSelecteddaycare = async (id) => {
    try {
      const response = await axios.get(`${SERVER_URL}/daycares/${id}/info`);
      setSelectedDaycare(response.data);
      setUser(response.data[0].provider_id);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching daycare details:", error);
    }
  };

  useEffect(() => {
    fetchSelecteddaycare(daycareid);
  }, [daycareid]);

  if (!selectedDaycare) {
    return <div>Loading...</div>;
  }

  // const groupedDaycares = selectedDaycare.reduce((acc, daycare) => {
  //   if (!acc[daycare.daycare_id]) {
  //     acc[daycare.daycare_id] = {
  //       providerFirstName: daycare.first_name,
  //       providerid: daycare.provider_id,
  //       images: [`${SERVER_URL}${daycare.daycarephoto}`],
  //       providerLastName: daycare.last_name
  //     };
  //   } else {
  //     acc[daycare.daycare_id].images.push(`${SERVER_URL}${daycare.daycarephoto}`);
  //   }
  //   return acc;
  // }, {});

  const groupedDaycares = selectedDaycare.reduce((acc, daycare) => {
    if (!acc[daycare.daycare_id]) {
      acc[daycare.daycare_id] = {
        ...daycare,
        daycarephotos: [`${SERVER_URL}${daycare.daycarephoto}`],
      };
    } else {
      acc[daycare.daycare_id].daycarephotos.push(
        `${SERVER_URL}${daycare.daycarephoto}`
      );
    }
    return acc;
  }, {});

  const DeleteDaycare = async () => {
    try {
      const res = await axios.delete(`${SERVER_URL}/daycares/${daycareid}`);
      setSelectedDaycare(res.data);
    } catch (err) {
      console.err(err);
    }
  };

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
    //  <div>
    //    <h1> Details</h1>
    //   {Object.entries(groupedDaycares).map(([daycare_id, { providerFirstName, images, providerLastName, providerid }]) => (
    //     <div key={daycare_id}>
    //       <p>First Name: {providerFirstName}</p>
    //       <p>Last Name : {providerLastName}</p>
    //       {currentUser && currentUser.role === "Admin" && (
    //          <div><img  src= {editicon} alt="editicon"></img><img onClick={DeleteUser} src= {deleteicon} alt="editicon"></img></div>
    //       )}
    //       {currentUser && currentUser.first_name === providerFirstName && (
    //           <div><img src= {editicon} alt="editicon"></img></div>
    //       )}

    //       {images.map((image, index) => (
    //         <img key={index} src={image} alt={`Daycare Photo ${index}`} width={250} height={250} />
    //       ))}
    //       {currentUser &&  currentUser.first_name === providerFirstName && (
    //           <div><img src= {editicon} alt="editicon"></img></div>
    //       )}
    //       {currentUser && currentUser.role === "Admin" && (
    //           <div><img  src= {editicon} alt="editicon"></img><img onClick= {DeleteDaycare}src= {deleteicon} alt="editicon"></img></div>
    //       )}

    //     </div>
    //   ))}
    // </div>

    <Wrapper>
      <h1> Details</h1>
      {Object.entries(groupedDaycares).map(([daycare_id, daycare]) => (
        <div key={daycare_id}>
          <p>First Name: {daycare.first_name}</p>
          <p>Last Name : {daycare.last_name}</p>
          {currentUser && currentUser.role === "Admin" && (
            <div>
              <img src={editicon} alt="editicon"></img>
              <img onClick={DeleteUser} src={deleteicon} alt="editicon"></img>
            </div>
          )}
          {currentUser &&
            currentUser.role !== "Admin" &&
            currentUser.first_name === daycare.first_name && (
              <div>
                <img src={editicon} alt="editicon"></img>
              </div>
            )}

          {daycare.daycarephotos &&
            daycare.daycarephotos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Daycare Photo ${index}`}
                width={250}
                height={250}
              />
            ))}
          {currentUser &&
            currentUser.role !== "Admin" &&
            currentUser.first_name === daycare.first_name && (
              <div>
                <img src={editicon} alt="editicon"></img>
              </div>
            )}
          {currentUser && currentUser.role === "Admin" && (
            <div>
              <img src={editicon} alt="editicon"></img>
              <img
                onClick={DeleteDaycare}
                src={deleteicon}
                alt="editicon"
              ></img>
            </div>
          )}
        </div>
      ))}
   </Wrapper>
  );
}
