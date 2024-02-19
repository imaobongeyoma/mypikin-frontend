//my daycare list component js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import deleteicon from "../../assets/icons/delete_outline-24px.svg"
import editicon from "../../assets/icons/edit-24px.svg"
import sort from "../../assets/icons/sort-24px.svg";

export default function DayCareList() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [daycares, setDaycares] = useState([]);
  // const [openModal, setOpenModal] = useState(false);
  const [selectedDaycare, setSelectedDaycare] = useState(null);
//   const { Id } = useParams();
  const navigate = useNavigate();

  // Fetch full daycare list from the API
  const fetchdaycareList = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/daycares`);
      setDaycares(response.data);
    } catch (error) {
      console.error("Error fetching fullList of daycares:", error);
    }
  };
  useEffect(() => {
    fetchdaycareList();
  }, []);


  function handlerOnItemClick(e){
    navigate(`/daycares/${e.target.getAttribute('daycare_id')}/info
    `);        
}
// Group daycares by ID and collect photos for each daycare ID
// const groupedDaycares = daycares.reduce((acc, daycare) => {
//     if (!acc[daycare.daycare_id]) {
//       acc[daycare.daycare_id] = { ...daycare, daycarephotos: [daycare.daycarephoto] };
//     } else {
//       acc[daycare.daycare_id].daycarephotos.push(daycare.daycarephoto);
//     }
//     return acc;
//   }, {});

// Group daycares by ID and collect first photo for each daycare ID
const groupedDaycares = daycares.reduce((acc, daycare) => {
    if (!acc[daycare.daycare_id]) {
      acc[daycare.daycare_id] = { ...daycare, firstPhoto: daycare.daycarephoto };
    }
    return acc;
  }, {});

  return (
    <div>
      <h1>Daycares</h1>
      {Object.values(groupedDaycares).map(daycare => (
        <Link to={`/daycares/${daycare.id}/info`} key={daycare.id}>
        <div key={daycare.id}>
          <h2>{daycare.name}</h2>
          <p>{daycare.daycare_description}</p>
          <p>Provider: {daycare.first_name} {daycare.last_name}</p>
          <div><img src={`${SERVER_URL}${daycare.profile_image}`} alt="Daycare Photo" width={50} height={50}  /></div>
                    <p>Email: {daycare.email}</p>
          {/* Map th rough daycare photos */}
          {/* {daycare.daycarephotos.map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index}`} />
          ))} */}
          <img src={`${SERVER_URL}${daycare.firstPhoto}`} alt="Daycare Photo" width={250} height={250}  />
        </div>
        </Link>
      ))}
      
    </div>
   
  );
}

