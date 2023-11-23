import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./nav.css";
export default function Nav({ handleSignout }) {
  const [activeLink, setActiveLink] = useState("");
  return (
    <>
      <nav className="nav-container">
        <ul>
          <li key="home">
            <Link to="/">
              <ion-icon name="home-outline"></ion-icon>
            </Link>
          </li>
          <li key="rofile">
            <Link to="/Profile">
              <ion-icon name="person-circle-outline"></ion-icon>
            </Link>
          </li>
          <li key="signout">
            <button onClick={handleSignout}>
              <ion-icon name="log-out-outline"></ion-icon>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
