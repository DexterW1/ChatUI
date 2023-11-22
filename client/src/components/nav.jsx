import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./nav.css";
export default function Nav() {
  const [activeLink, setActiveLink] = useState("");
  return (
    <>
      <nav className="nav-container">
        <ul>
          <li key="home">
            <Link to="/">Home</Link>
          </li>
          <li key="messages">
            <Link to="/Messages">Messages</Link>
          </li>
          <li key="Profile">
            <Link to="/Profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
