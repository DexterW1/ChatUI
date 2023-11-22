import React from "react";
import "./loader.css";

import { Discuss } from "react-loader-spinner";
export default function Loader() {
  return (
    <div className="loader-container">
      <Discuss
        visible={true}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#F4442E"
      />
    </div>
  );
}
