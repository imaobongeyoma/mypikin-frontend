//my daycare component js
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";

const AddDayCare = () => {
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
    daycare_photos: [],

})

const handleChange = (e) => {
    if (e.target.name === "daycare_photos") {
        setFormData({ ...fromData, [e.target.name]: e.target.files});
    } else {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
}

const handleSubmit = async (e) => {
    e.preventDefault()
    
}


const  { currentUser } = useContext(AuthContext)

return  (

    <>
    </>
)
}