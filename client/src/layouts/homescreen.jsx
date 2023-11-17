import "./homescreen.css";
import { useState, useEffect } from "react";
export default function Homescreen({ user, handleSignout }) {
  return (
    <>
      <button onClick={handleSignout}>Signout</button>
      <h1>Hi! {user.displayName}</h1>
    </>
  );
}
