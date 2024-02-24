//my daycare list component js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
// import deleteicon from "../../assets/icons/delete_outline-24px.svg";
// import editicon from "../../assets/icons/edit-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import { AuthContext } from "../Context/authContext";
import { useContext } from "react";
import Wrapper from "../Wrapper/Wrapper";
import blueicon from "../../assets/icons/blueicon.png";
import doubleicon from "../../assets/icons/doubleicon.png";
import orangeicon from "../../assets/icons/orangeicon.png";
import deleteicon from "../../assets/icons/deleteicon.png";
import editicon from "../../assets/icons/editicon.png";

import "./SingleDaycare.scss";

export default function SelectedDaycare() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [selectedDaycare, setSelectedDaycare] = useState([]);
  const [user, setUser] = useState([]);
  const [showContacts, setShowContacts] = useState(false);

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

  const toggleContacts = () => {
    setShowContacts(!showContacts);
  };

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
      navigate("/daycarelist");
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
    <Wrapper>
      {Object.entries(groupedDaycares).map(([daycare_id, daycare]) => (
        <div key={daycare_id} className="singled">
         
          <div className="singled__imgcont">
            <img
              src={daycare.daycarephotos[0]}
              className="singled__img"
            ></img>
          </div>
          <div className="singled__topwrapper">
          
          <div className="singled__dpwrap">
          <div className="singled__details">
            <div className="singled__namewrap">
              <img
                src={doubleicon}
                alt="mini-doubleicon"
                className="singled__nameicon"
              ></img>

              {/* <div className="singled__topdetails"></div> */}
              <h2 className="singled__name">{daycare.name}</h2>
            </div>

            <h3 className="singled__price">
              
              Price:
              <span className="singled__detail"> ${daycare.price} per day</span>
            </h3>
            <h3 className="singled__hours">
              
              Hours:
              <span className="singled__detail"> {daycare.hours_start}am to {daycare.hours_close}pm
              </span>
            </h3>
            <h3 className="singled__location">
              
              Location: <span className="singled__detail">{daycare.city}</span>
            </h3>
            <button className="singled__contactcta" onClick={toggleContacts}>
              Contact Us!
            </button>
            {showContacts && (
              <div className="singled__contacts">
                <p className="singled__email">
                  Please reach us at <span className="singled__detail">{daycare.email}</span>
                </p>
                <p className="singled__phone">
                  Our phone number is <span className="singled__detail">{daycare.phone_number} </span>
                </p>
              </div>
            )}

{currentUser &&
            currentUser.role !== "Admin" &&
            currentUser.first_name === daycare.first_name && (
              <div>
                <img
                  src={editicon}
                  alt="editicon"
                  title="Edit daycare info"
                  onClick={() =>
                    navigate(`/daycares/${daycare.daycare_id}/edit`)
                  }
                ></img>
              </div>
            )}
          {currentUser && currentUser.role === "Admin" && (
            <div>
              <img src={editicon} alt="editicon" title="Edit daycare info" onClick={() =>
                    navigate(`/daycares/${daycare.daycare_id}/edit`)
                  }></img>
              <img
                onClick={DeleteDaycare}
                src={deleteicon}
                alt="deleteicon"
                title="Delete daycare"
              ></img>
            </div>
          )}
          </div>

          <div className="singled__profile">
            <h2 className="singled__director">Program Director Details</h2>
            <div className="singled__profcont">
              <img
                src={`${SERVER_URL}${daycare.profile_image}`}
                className="singled__profileimage"
              ></img>
            </div>

            <h3 className="singled__profdetails">
              {daycare.first_name} {daycare.last_name}
            </h3>

            {daycare.background_check_done === "Yes" ? (
              <div className="singled__bgcheck">
                <h3 className="singled__profdetails">
                  Background Check Approved
                </h3>
                <div><img src={blueicon} className="singled__bgimage"></img></div>
              </div>
            ) : (
              <div className="singled__bgcheck">
                <p className="singled__profdetails">
                  Background Check Not Approved
                </p>
                <img src={orangeicon} className="singled__bgimage"></img>
              </div>
            )}

            <div>
              {currentUser && currentUser.role === "Admin" && (
                <div className="singled__edit-del">
                  <Link to={`/user/${daycare.provider_id}/edit`}><img src={editicon} alt="editicon" title="Edit provider details"></img></Link>
                  <img
                    onClick={DeleteUser}
                    src={deleteicon}
                    alt="editicon"
                    title="Delete provider"
                  ></img>
                </div>
              )}
            </div>
            {currentUser &&
              currentUser.role !== "Admin" &&
             currentUser.first_name === daycare.first_name && (
                <div className="singled__edit-del">
                  <Link to={`/user/${daycare.provider_id}/edit`}><img src={editicon} alt="editicon" title="Edit provider details"></img></Link>
                </div>
              )}
          </div>
          </div>

          <div className="singled__bottomdetails">
            <h2 className="singled__about">More About {daycare.name}</h2>
            <p className="singled__description">{daycare.daycare_description}</p>
            <p className="singled__description"> {daycare.provider_about}</p>
           

          </div>
          <div className="singled__photos">
          <h2 className="singled__photostitle">Photos</h2>
          <div className="singled__photoswrap">
          {daycare.daycarephotos &&
            daycare.daycarephotos.map(
              (photo, index) =>
                index !== 0 && (
                 <div className="singled__photocont" key={index}>
                  <img className="singled__photo"
                    key={index}
                    src={photo}
                    alt={`Daycare Photo ${index}`}
                    width={250}
                    height={250}
                  />
                </div>)
            )}
            </div>
            </div>
            </div>
        </div>
      ))}
    </Wrapper>
  );
}
