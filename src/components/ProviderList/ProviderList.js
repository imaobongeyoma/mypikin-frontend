//my provider list component js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import deleteicon from "../../assets/icons/delete_outline-24px.svg"
import editicon from "../../assets/icons/edit-24px.svg"
import "./ProviderList.scss";
import sort from "../../assets/icons/sort-24px.svg";

export default function ProviderList() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [providers, setproviders] = useState([]);
  // const [openModal, setOpenModal] = useState(false);
  const [selectedprovider, setSelectedprovider] = useState(null);
  const { providerId } = useParams();
  const navigate = useNavigate();

  // Fetch full provider list from the API
  const fetchproviderList = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/users`);
      setproviders(response.data);
    } catch (error) {
      console.error("Error fetching fullList of providers:", error);
    }
  };
  useEffect(() => {
    fetchproviderList();
  }, []);

  // const handleDeleteModalShow = (provider) => {
  //   setSelectedprovider(provider);
  //   setOpenModal(true);
  // };
  // const handleDeleteModalClose = () => {
  //   setOpenModal(false);
  // };

  // const handleDeleteprovider = () => {
  //   if (selectedprovider) {
  //     axios
  //       .delete(`${SERVER_URL}/providers/${selectedprovider.id}`)
  //       .then((response) => {
  //         setproviders(
  //           providers.filter(
  //             (provider) => provider.id !== selectedprovider.id
  //           )
  //         );
  //         setSelectedprovider(null);
  //         setOpenModal(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error deleting provider", error);
  //       });
  //   }
  // };
  return (
    <>
      <section className="provider mobile">
        {providers.map((provider) => (
          <div className="provider__card" key={provider.id}>
                  <div className="provider__label">Provider Details</div>
                  <div className="provider__info provider__name-wrap">
                    <Link to={`/providers/${provider.id}`}>
                      First Name: {provider.firstname} <span>Last Name: {provider.lastname}</span>
                    </Link>
                  </div>
                  <div className="provider__phone provider__info">
                    Phone Number: {provider.phone_number}
                  </div>
                  <div className="provider__email provider__info">
                    Email: {provider.email}
                  </div>
                  <div className="provider__username provider__info">
                    Username: {provider.username}
                  </div>
                </div>
            
        ))}
      </section>

      {/* This section below is for table data
      <section className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr className="table__head-row">
              <th className="table__head-title">
                provider{" "}
                <img src={sort} alt="sort" className="table__sort"></img>
              </th>
              <th className="table__head-title table__address">
                ADDRESS{" "}
                <img src={sort} alt="sort" className="table__sort"></img>{" "}
              </th>
              <th className="table__head-title">
                CONTACT NAME{" "}
                <img src={sort} alt="sort" className="table__sort"></img>
              </th>
              <th className="table__head-title">
                CONTACT INFORMATION{" "}
                <img src={sort} alt="sort" className="table__sort"></img>{" "}
              </th>
              <th className="table__head-title"> ACTIONS </th>
            </tr>
          </thead>
          <tbody className="table__body">
            {providers.map((provider) => (
              <tr key={provider.id} className="table__provider-row">
                <td className="table__title table__provider-name">
                  <div className="table__name-wrap" onClick={() => navigate(`/providers/${provider.id}`)}>
                      {provider.provider_username}
                      <img
                        src={chevronicon}
                        alt="chevronicon"
                        className="table__chevron"
                      ></img>
                  </div>
                </td>
                <td className="table__address table__title">
                  {provider.address}, {provider.city}, {provider.country}
                </td>

                <td className="table__title table__contact-name">
                  {provider.contact_name}
                </td>
                <td className="table__contacts table__title">
                  <p className="table__contacts-details">{provider.contact_phone}</p>
                  <p className="table__contacts-details"> {provider.contact_email}</p>
                </td>
                <td className="table__actions table__title">
                  {" "}
                  <div className="table__action-icons">
                    
                    <img
                      src={deleteicon}
                      alt="deleteicon"
                      className="table__delete-icon"
                    
                    ></img>{" "}
                    <Link to= {`/providers/${provider.id}/editprovider`}>
                    <img
                      src={editicon}
                      alt="deleteicon"
                      className="table__edit-icon"
                    ></img>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section> */}
{/* 
      {openModal && (
        <Deleteprovider
          closeModal={handleDeleteModalShow}
          handleClose={handleDeleteModalClose}
          handleDelete={handleDeleteprovider}
          provider_name={
            selectedprovider ? `${selectedprovider.provider_name}` : ""
          }
        />
      )} */}
    </>
  );
}
