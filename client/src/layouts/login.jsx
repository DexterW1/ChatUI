import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import "./login.css";
const auth = getAuth();
export default function Login({ setUser }) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        console.log("Signed in");
        const user = userCredential.user;
        console.log(user);
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
      <div className="login-container">
        <div className="login-card">
          <h1>Login</h1>
          <form className="form-container" onSubmit={handleLogin}>
            <div className="email-container">
              <input
                className="login-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
              />
            </div>
            <div className="password-container">
              <input
                className="login-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••••"
              />
            </div>
            <div className="button-container">
              <button id="submit-login-btn" type="submit">
                Login
              </button>
            </div>
            <div className="signup-container">
              <p>Don't have an account?</p>
              <Link to="/Register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
