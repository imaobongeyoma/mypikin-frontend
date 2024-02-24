import React, { useState, useEffect, useContext } from "react";
import "./Footer.scss"

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
