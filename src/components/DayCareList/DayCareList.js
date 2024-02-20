//my daycare list component js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";

export default function DayCareList() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [daycares, setDaycares] = useState([]);
  // const [selectedDaycare, setSelectedDaycare] = useState(null);
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();

  // Fetch full daycare list from the API
  const fetchdaycareList = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/daycares`);
      setDaycares(response.data);
      console.log(response.data);
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

// Group daycares by ID and collect first photo for each daycare ID
const groupedDaycares = daycares.reduce((acc, daycare) => {
    if (!acc[daycare.daycare_id]) {
      acc[daycare.daycare_id] = { ...daycare, firstPhoto: daycare.daycarephoto };
    }
    return acc;
  }, {});

  return (
    <Wrapper>
    <div>
      <h1>Daycares</h1>
      <div>
        <input type="text" placeholder="Search by City" onChange ={event => {setSearchTerm(event.target.value)}}></input>
      </div>
      {Object.values(groupedDaycares).filter((daycare) => {
        if (searchTerm === "") {
          return true;
        } else if (daycare.city.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
      return false;})
      .map(daycare => (
        <Link to={`/daycares/${daycare.id}/info`} key={daycare.id}>
        <div key={daycare.id}>
          <h2>{daycare.name}</h2>
          <p>{daycare.daycare_description}</p>
          <p>Provider: {daycare.first_name} {daycare.last_name}</p>
          <div><img src={`${SERVER_URL}${daycare.profile_image}`} alt="Daycare Photo" width={50} height={50}  /></div>
                    <p>Email: {daycare.email}</p>
          <img src={`${SERVER_URL}${daycare.firstPhoto}`} alt="Daycare Photo" width={250} height={250}  />
        </div>
        </Link>
      ))}
      
    </div>
    </Wrapper>
   
  );
}

