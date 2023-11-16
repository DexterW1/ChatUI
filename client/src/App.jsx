import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./layouts/login";
import Register from "./components/register";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
