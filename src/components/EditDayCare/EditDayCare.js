//my daycare component js
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";

export default function EditDayCare() {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: "",
    provider_id: "",
    name: "",
    daycare_description: "",
    provider_about: "",
    tag_line: "",
    price: "",
    hours_start: "",
    hours_close: "",
    street_number: "",
    street_name: "",
    city: "",
    postal_code: "",
    province: "",
    country: "",
  });
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const fetchDaycare = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/daycares/${id}/`);
      setFormData({
        ...formData,
        id: response.data.id,
        provider_id: response.data.provider_id,
        name: response.data.name,
        daycare_description: response.data.daycare_description,
        provider_about: response.data.provider_about,
        tag_line: response.data.tag_line,
        price: response.data.price,
        hours_start: response.data.hours_start,
        hours_close: response.data.hours_close,
        street_number: response.data.street_number,
        street_name: response.data.street_name,
        city: response.data.city,
        postal_code: response.data.postal_code,
        province: response.data.province,
        country: response.data.country,
      });
      //   setUser(response.data[0].provider_id);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching daycare details:", error);
    }
  };

  useEffect(() => {
    fetchDaycare();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("provider_id", formData.provider_id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("daycare_description", formData.daycare_description);
    formDataToSend.append("provider_about", formData.provider_about);
    formDataToSend.append("tag_line", formData.tag_line);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("hours_start", formData.hours_start);
    formDataToSend.append("hours_close", formData.hours_close);
    formDataToSend.append("street_number", formData.street_number);
    formDataToSend.append("street_name", formData.street_name);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("postal_code", formData.postal_code);
    formDataToSend.append("province", formData.province);
    formDataToSend.append("country", formData.country);

    try {
      await axios.put(`${SERVER_URL}/daycares/${id}`, formDataToSend, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })

   
    } catch (error) {
      console.error("Error editing daycare:", error);
    }
  };

  if (!currentUser) {
    return (
      <main>
        Please Log In to update your daycare
        <Link to="/login"> Log In</Link>
      </main>
    );
  }

  return (
    <>
    <Wrapper>
      {currentUser.id === formData.provider_id || currentUser.role === "Admin" ? (
        <form onSubmit={handleSubmit}>
          <h1> Edit your Daycare</h1>
          <div>
            <label>
              Provider Id:
              <input
                type="text"
                name="provider_id"
                value={formData.provider_id}
                onChange={handleChange}
                readOnly={true}
              />
            </label>
          </div>

          <div>
            <label>
              Daycare Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Daycare Description:
              <input
                type="text"
                name="daycare_description"
                value={formData.daycare_description}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              About the Provider :
              <input
                type="text"
                name="provider_about"
                value={formData.provider_about}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Daycare Tag Line :
              <input
                type="text"
                name="tag_line"
                value={formData.tag_line}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Price per day :
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Opening Time :
              <input
                type="text"
                name="hours_start"
                value={formData.hours_start}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Closing Time :
              <input
                type="text"
                name="hours_close"
                value={formData.hours_close}
                onChange={handleChange}
              />
            </label>
          </div>

          <h2> Location Details </h2>
          <div>
            <label>
              Street Number :
              <input
                type="text"
                name="street_number"
                value={formData.street_number}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Street Name :
              <input
                type="text"
                name="street_name"
                value={formData.street_name}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              City :
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Postal Code :
              <input
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Province :
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Country :
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit"> Edit Daycare</button>
        </form>
      ) : (
        <div> You are not the owner of this daycare. </div>
      )}
      </Wrapper>
    </>

  );
}
