import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { Link, NavLink } from "react-router-dom";
import "./Footer.scss"
import blueicon from "../../assets/icons/blueicon.png";
import orangeicon from "../../assets/icons/orangeicon.png";
import deleteicon from "../../assets/icons/deleteicon.png";
import editicon from "../../assets/icons/editicon.png";

export default function Footer() {
    return (
        <section className="footer">
            <div className="footer__titles">
            <div className="footer__content">Support</div>
            <div className="footer__content">Blog</div>
            <div className="footer__content">Terms</div>
            <div className="footer__content">Privacy Policy</div>
            </div>
            <div className="footer__copyright"> &copy; 2024 mypikin</div>
        </section>
    )
}
