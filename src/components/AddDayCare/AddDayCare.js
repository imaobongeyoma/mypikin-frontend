//my daycare component js
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import { Link } from "react-router-dom";

export default function AddDayCare ()  {
    const  { currentUser } = useContext(AuthContext);
    const [formData, setFormData] = useState ({
        provider_id: currentUser.id,
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

})
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const handleChange = (e) => {
    if (e.target.name === "daycare_photos") {
        setFormData({ ...formData, [e.target.name]: e.target.files});
    } else {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
}

const handleSubmit = async (e) => {
    e.preventDefault()
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
    for (let i=0; i <formData.daycare_photos.length; i++) {
        formDataToSend.append("daycare_photos", formData.daycare_photos[i])
    }

    try {
        await axios.post(`${SERVER_URL}/daycares/createdaycare`, formDataToSend,{
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    } catch (error) {
        console.error("Error adding daycare:", error)
    }
}

if (!currentUser) {
  return (
      <main> 
          Please Log In to create a daycare
          <Link to="/login"> Log In</Link>
      </main>
  )
  }

return  (

    <>
    <form onSubmit={handleSubmit}>

       <h1> Add your Daycare</h1>
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

        <h2>Add Photos of your daycare</h2>
        <div>
            <label>
                Photos:
                <input
                type="file"
                name="daycare_photos"
                multiple onChange={handleChange} ></input>
            </label>

            <button type ="submit"> Add Daycare</button>
        </div>
        </form>
    
    </>
)
}