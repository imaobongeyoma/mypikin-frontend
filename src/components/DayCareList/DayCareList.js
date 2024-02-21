import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Wrapper from "../Wrapper/Wrapper";
import "./DayCareList.scss";
import doubleicon from "../../assets/icons/doubleicon.png";
import searchicon from "../../assets/icons/search-24px.svg";

export default function DayCareList() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [daycares, setDaycares] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Group daycares by ID and collect first photo for each daycare ID
  const groupedDaycares = daycares.reduce((acc, daycare) => {
    if (!acc[daycare.daycare_id]) {
      acc[daycare.daycare_id] = {
        ...daycare,
        firstPhoto: daycare.daycarephoto,
      };
    }
    return acc;
  }, {});

  return (
    <Wrapper>
      <div className="home">
        <div className="search">
          <img src={searchicon} className="search__sicon"></img>
          <input
            type="text"
            placeholder="Search by City"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            className="search__box"
          ></input>
        </div>
        <div className="daycarewrapper">
          {Object.values(groupedDaycares)
            .filter((daycare) => {
              if (searchTerm === "") {
                return true;
              } else if (
                daycare.city.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return true;
              }
              return false;
            })
            .filter((daycare) => daycare.background_check_done === "Yes")
            .map((daycare) => (
              <div
                key={daycare.id}
                onClick={() => navigate(`/daycares/${daycare.id}/info`)}
                className="daycare"
              >
                <div className="daycare__imagewrap">
                  <img
                    src={`${SERVER_URL}${daycare.firstPhoto}`}
                    alt="Daycare Photo"
                    className="daycare__cover"
                  />
                </div>

                <div className="daycare__namewrap">
                  <img
                    src={doubleicon}
                    alt="mini-doubleicon"
                    className="daycare__nameicon"
                  ></img>
                  <p className="daycare__name">{daycare.name}</p>
                </div>
                <p className="daycare__price">${daycare.price} per day</p>
                <p className="daycare__hours">
                  {daycare.hours_start}am - {daycare.hours_close}pm
                </p>
              </div>
            ))}
        </div>
      </div>
    </Wrapper>
  );
}
