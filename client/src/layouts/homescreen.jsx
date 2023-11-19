import "./homescreen.css";
import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
export default function Homescreen({ user, handleSignout }) {
  return (
    <>
      <div className="home-container">
        <button onClick={handleSignout}>Signout</button>
        <h1>Hi! {user.displayName}</h1>
        You can se meeFront End (React) Developer - W2 - Irvine, CA
      </div>
    </>
  );
}
