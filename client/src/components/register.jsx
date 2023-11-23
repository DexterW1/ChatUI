import "./register.css";
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase";
const auth = getAuth();
export default function Register({ handleRegistrationToggle }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [status, setStatus] = useState(null);
  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(user, { displayName: formData.username })
          .then(() => {
            console.log("Profile updated successfully!");
            setStatus("success");
          })
          .catch((profileError) => {
            console.error("Failed to update profile:", profileError.message);
          });
        <Link to="/" />;
        console.log("Signed up!");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setStatus("error");
        // ..
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="register-container">
        <div className="register-card">
          <h1>Register</h1>
          <form className="form-container" onSubmit={handleRegister}>
            <div className="username-container">
              <input
                className="register-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
              />
            </div>
            <div className="email-container">
              <input
                className="register-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
              />
            </div>
            <div className="password-container">
              <input
                className="register-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••••"
              />
            </div>
            <div className="button-container">
              <button id="submit-register-btn" type="submit">
                Register
              </button>
            </div>
            {status === "success" && (
              <div className="status-message colorgreen">
                <p>Registration Success</p>
              </div>
            )}
            {status === "error" && (
              <div className="status-message colorred">
                <p>Registration Failed</p>
              </div>
            )}
            <div className="backbtn-container">
              <button onClick={handleRegistrationToggle}>
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
