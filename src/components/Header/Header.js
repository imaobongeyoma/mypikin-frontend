import React, { useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/logos/pikin3.png";
import blueicon from "../../assets/icons/blueicon.png";
import orangeicon from "../../assets/icons/orangeicon.png";

export default function Header({ toggleMenu, menuOpen}) {
  const { currentUser, logout } = useContext(AuthContext);
 
  const iconSrc =
    currentUser && currentUser.role === "Admin" ? orangeicon : blueicon;
  const handleMenuItemClick = () => {
   toggleMenu();
  };

  return (
    <>
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav__logo">
            <img src={logo} className="nav__logoimg" alt="logo"></img>
          </Link>
          <div className="nav__menu" onClick={toggleMenu}>
            <span className="nav__span"></span>
            <span className="nav__span"></span>
            <span className="nav__span"></span>
          </div>

          <ul className={`nav__menuul ${menuOpen ? "nav__open" : ""}`}>
            <li className="nav__list">
              <NavLink to="/" className="nav__find nav__userlink">
                <div className="nav__userwrap" onClick={handleMenuItemClick}>
                  <img
                    src={iconSrc}
                    alt="blueicon"
                    className="nav__blueicon nav__icon"
                  ></img>

                  <div className="nav__findtext"> Find Child Care</div>
                </div>
              </NavLink>
            </li>

            {currentUser && (
              <>
                {currentUser.role === "Provider" && (
                  <li className="nav__list" onClick={handleMenuItemClick}>
                    <NavLink
                      to={`/user/${currentUser.id}`}
                      className="nav__userlink"
                    >
                      <div className="nav__userwrap">
                        <img
                          src={iconSrc}
                          alt="blueicon"
                          className="nav__blueicon nav__icon"
                        ></img>
                        <div className="nav__userlog">
                          {currentUser.first_name} {currentUser.last_name}
                        </div>
                      </div>
                    </NavLink>
                  </li>
                )}
                {currentUser.role === "Admin" && (
                  <li className="nav__list" onClick={handleMenuItemClick}>
                    <NavLink to={`/`} className="nav__userlink">
                      <div className="nav__userwrap">
                        <img
                          src={iconSrc}
                          alt="blueicon"
                          className="nav__blueicon nav__icon"
                        ></img>
                        <div className="nav__userlog">
                          {currentUser.first_name} {currentUser.last_name}
                        </div>
                      </div>
                    </NavLink>
                  </li>
                )}

                <li className="nav__list">
                  <NavLink
                    to="/daycarelist"
                    className="nav__userlink"
                    onClick={logout}
                  >
                    <div
                      className="nav__userwrap"
                      onClick={handleMenuItemClick}
                    >
                      <img
                        src={iconSrc}
                        alt="blueicon"
                        className="nav__blueicon nav__icon"
                      ></img>
                      <div className="nav__userlog">Logout</div>
                    </div>
                  </NavLink>
                </li>
              </>
            )}

            {!currentUser && (
              <>
                <li className="nav__list">
                  <NavLink to="/login" className="nav__userlink">
                    <div
                      className="nav__userwrap"
                      onClick={handleMenuItemClick}
                    >
                      <img
                        src={blueicon}
                        alt="blueicon"
                        className="nav__blueicon nav__icon"
                      ></img>
                      <div className="nav__userlog">Log In</div>
                    </div>
                  </NavLink>
                </li>
                <li className="nav__list">
                  <NavLink to="/signup" className="nav__userlink">
                    <div
                      className="nav__userwrap"
                      onClick={handleMenuItemClick}
                    >
                      <img
                        src={blueicon}
                        alt="blueicon"
                        className="nav_blueicon nav__icon"
                      ></img>

                      <div className="nav__userlog">Sign Up</div>
                    </div>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
