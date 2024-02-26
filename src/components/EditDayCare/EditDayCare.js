import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";
import "./EditDayCare.scss";

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
    console.error(formData);
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
        },
      });
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
        {currentUser.id === formData.provider_id ||
        currentUser.role === "Admin" ? (
          <section className="sform">
            <div className="sform__heading">
              <h1 className="sform__title">Edit Daycare</h1>
            </div>

            <form onSubmit={handleSubmit} className="form">
              <h2 className="sform__subheads"> Daycare Details </h2>
              <div className="form__stylewrap">
                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="id">
                    Provider Id:
                  </label>
                  <input
                    type="text"
                    name="provider_id"
                    id="id"
                    value={formData.provider_id}
                    className="form__field"
                    onChange={handleChange}
                    readOnly={true}
                  />
                </div>

                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="name">
                    Daycare Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    className="form__field"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form__stylewrap">
                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="description">
                    Daycare Description:
                  </label>
                  <textarea
                    name="daycare_description"
                    id="description"
                    value={formData.daycare_description}
                    rows={2}
                    className="form__field form__textarea"
                    onChange={handleChange}
                  />
                </div>

                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="about">
                    
                    About the Provider :
                  </label>

                  <textarea
                    name="provider_about"
                    id="about"
                    value={formData.provider_about}
                    rows={2}
                    className="form__field form__textarea"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form__stylewrap">
                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="tag">
                    Daycare Tag Line :
                  </label>
                  <input
                    type="text"
                    name="tag_line"
                    id="tag"
                    value={formData.tag_line}
                    className="form__field"
                    onChange={handleChange}
                  />
                </div>

                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="price">
                    Price per day :
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={formData.price}
                    className="form__field"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form__stylewrap">
                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="open">
                    Opening Time :
                  </label>
                  <input
                    type="text"
                    name="hours_start"
                    id="open"
                    value={formData.hours_start}
                    className="form__field"
                    onChange={handleChange}
                  />
                </div>

                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="close">
                    Closing Time :
                  </label>
                  <input
                    type="text"
                    name="hours_close"
                    id="close"
                    value={formData.hours_close}
                    className="form__field"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <h2 className="sform__subheads">Location Details </h2>
              <div className="form__stylewrap">
                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="streetn">
                    Street Number :
                  </label>
                  <input
                    type="text"
                    name="street_number"
                    id="streetn"
                    value={formData.street_number}
                    className="form__field"
                    onChange={handleChange}
                  />
                </div>
                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="streetname">
                    Street Name :
                  </label>
                  <input
                    type="text"
                    name="street_name"
                    id="streetname"
                    value={formData.street_name}
                    className="form__field"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form__stylewrap">
                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="city">
                    City :
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    className="form__field"
                    onChange={handleChange}
                  />
                </div>

                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="postcode">
                    Postal Code :
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    id="postcode"
                    value={formData.postal_code}
                    className="form__field"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form__stylewrap">
                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="province">
                    Province :
                  </label>
                  <input
                    type="text"
                    name="province"
                    id="province"
                    value={formData.province}
                    className="form__field"
                    onChange={handleChange}
                  />
                </div>

                <div className="form__inputwrap">
                  <label className="form__label" htmlFor="country">
                    Country :
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.country}
                    className="form__field"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="form__editdaycare">
                
                Edit Daycare
              </button>
            </form>
          </section>
        ) : (
          <section className="access">
            <h2>
              
              You are not the owner of this daycare. Please visit your profile.
            </h2>
            <div className="access__btns">
              <Link to={`/user/${currentUser.id}`}>
                <button className="access__profilebtn access__btn ">
                  Your Profile
                </button>
              </Link>
              <Link to="/">
                
                <button className="access__homebtn access__btn">Home</button>
              </Link>
            </div>
          </section>
        )}
      </Wrapper>
    </>
  );
}
