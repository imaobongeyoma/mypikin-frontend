import React, { } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss"

export default function Footer() {
    return (
        <section className="footer">
            <div className="footer__titles">
            <Link to="/about" className="footer__about"><div className="footer__content">About</div></Link> 
            <Link to="/support" className="footer__about"><div className="footer__content">Support</div></Link>
            <Link to="/terms" className="footer__about"><div className="footer__content">Terms</div></Link>
            <Link to="/privacy" className="footer__about"><div className="footer__content">Privacy</div></Link>
            </div>
            <div className="footer__copyright"> &copy; 2024 mypikin</div>
        </section>
    )
}
