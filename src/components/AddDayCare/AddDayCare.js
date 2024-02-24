//my daycare component js
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import { Link,  useNavigate , useParams } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";
import "./AddDayCare.scss";

export default function AddDayCare() {
  const { currentUser } = useContext(AuthContext);
  const [selectedProvider, setSelectedProvider] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

// trying to enforce user to create one daycare only
const fetchData = async (id) => {
  try {
    const [response, providerOnly] = await Promise.all([
      axios.get(`${SERVER_URL}/users/${id}/daycare`),
      axios.get(`${SERVER_URL}/users/${currentUser.id}`),
    ]);
    setSelectedProvider(response.data);
    setUser(providerOnly.data);
    // setGroupedProvider(response.data[0].provider_id);
  
    console.log(providerOnly.data);
    console.log(selectedProvider.length);
    console.log(id);
  } catch (error) {
    console.error("Error fetching daycare details:", error);
  }
};

useEffect(() => {
  fetchData(id);
}, [id]);



  //

  const [formData, setFormData] = useState({
    provider_id: [currentUser.id],
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
    daycare_photos: [],
  });
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const handleChange = (e) => {
    if (e.target.name === "daycare_photos") {
      setFormData({ ...formData, [e.target.name]: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("provider_id", currentUser.id);
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
    for (let i = 0; i < formData.daycare_photos.length; i++) {
      formDataToSend.append("daycare_photos", formData.daycare_photos[i]);
    }
    

    try {
      await axios.post(`${SERVER_URL}/daycares/createdaycare`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/user/${currentUser.id}`)
    } catch (error) {
      console.error("Error adding daycare:", error);
    }
  };

  if (!currentUser) {
    return (
      <main>
        Please Log In to create a daycare
        <Link to="/login"> Log In</Link>
      </main>
    );
  }

  if (currentUser && currentUser.role === "Admin") {
    return (
      <div className="addaccess">
        <div className="addaccess__message">
          <div> Administrators cannot create daycare.</div>
          <div className="addaccess__btns">
            <Link to="/">
              <button className="addaccess__adminbtn addaccess__btn ">
                Admin View
              </button>{" "}
            </Link>
            <Link to="/">
              {" "}
              <button className="addaccess__homebtn addaccess__btn">
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // if (id !== selectedProvider.provider_id) {
  //   return (
  //     <main>
  //       You can only create one daycare
  //       <Link to="/login"> Log In</Link>
  //     </main>
  //   );
  // }

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

  return (
    <>
      <Wrapper>
      {/* {Object.keys(groupedProviders).length > 0 ? ( */}
        {selectedProvider.length > 0 || id !== selectedProvider.provider_id? (
        <div>You cannot create more than one daycare. You can edit your existing daycare details. If you need more help, please contact support</div> ): (
        <div className="sform">
          <div className="sform__heading">
            <h1 className="sform__title">Create Daycare</h1>
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
                  rows={4}
                  columns={50}
                  className="form__field"
                  onChange={handleChange}
                />
              </div>

              <div className="form__inputwrap">
                <label className="form__label" htmlFor="about">
                  {" "}
                  About the Provider :{" "}
                </label>

                <textarea
                  name="provider_about"
                  id="about"
                  value={formData.provider_about}
                  className="form__field"
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
                  Closing Time :{" "}
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
                  Street Number :{" "}
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
                  Street Name :{" "}
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
                  City :{" "}
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
                  Province :{" "}
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
                  Country :{" "}
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
            <h2 className="sform__subheads">Add Photos of your daycare</h2>
            <div className="form__inputwrap">
              <label className="form__label" htmlFor="photos"></label>
              Photos:
              <input
                type="file"
                id="photos"
                name="daycare_photos"
                className="form-control form-control-lg form__field-image"
                multiple
                onChange={handleChange}
              ></input>
              <button type="submit" className="form__adddaycare">
                {" "}
                Add Daycare
              </button>
            </div>
          </form>
        </div> )}
      </Wrapper>
    </>
  );
}
