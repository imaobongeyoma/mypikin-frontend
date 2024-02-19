import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { Link } from "react-router-dom";

export default function Header() {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <div>
        <h1>Hello</h1>
        <Link to="/daycarelist"><button >Home</button></Link>

        {/* <h2><Link to={`/user/${currentUser.id}`}>{currentUser?.username}</Link></h2> */}
        {/* <h2>{currentUser?.username}</h2> */}
          {currentUser ? (
            <div>
               {/* <h2>{currentUser?.username}</h2> */}
               <h2><Link to={`/user/${currentUser.id}`}>{currentUser.username}</Link></h2>
            <button onClick={logout}>Logout</button>
            <Link to="/createdaycare"><button >Add Daycare</button></Link> 
            </div>
          ) : (
            <Link className="link" to="/login">
              <button>Log In</button>
            </Link>
          )}
          </div>
    )
}