import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { StreamChat } from "stream-chat";
import { app } from "../firebase";
import "./login.css";
import Register from "../components/register";
const auth = getAuth();

export default function Login({ setUser, setChatClient }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showRegistration, setShowRegistration] = useState(false);
  const handleRegistrationToggle = () => {
    setShowRegistration(!showRegistration);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        // Signed in
        // console.log("Re entered handleLogin");
        // const user = userCredential.user;
        // console.log(user);
        // setUser(user);
        // localStorage.setItem("user", JSON.stringify(user));
        // const streamUser = {
        //   id: user.uid,
        //   name: user.displayName,
        //   image: "https://picsum.photos/200",
        // };
        // localStorage.setItem("streamuser", JSON.stringify(streamUser));
        // const chatClient = StreamChat.getInstance(
        //   import.meta.env.VITE_STREAM_API_KEY
        // );
        // await chatClient.connectUser(streamUser, chatClient.devToken(user.uid));
        // console.log(chatClient);
        // // console.log(chatClient);
        // setChatClient(chatClient);
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
  useEffect(() => {
    const storedStreamUser = JSON.parse(localStorage.getItem("streamuser"));
    const init = async () => {
      const chatClient = StreamChat.getInstance(
        import.meta.env.VITE_STREAM_API_KEY
      );
      // setChatClient(chatClient);
      // Connect the user using the stored token
      const storedStreamUser = JSON.parse(localStorage.getItem("streamuser"));
      if (storedStreamUser) {
        await chatClient.connectUser(
          storedStreamUser,
          chatClient.devToken(storedStreamUser.id)
        );
        console.log("This is in reinit", chatClient);
        setUser(storedStreamUser);
        setChatClient(chatClient);
      } else {
        console.log("No stored user found");
        setUser(null);
      }
    };
    if (storedStreamUser) {
      console.log("Entered init");
      init();
    }
  }, []);
  return (
    <>
      {!showRegistration && (
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
                <a onClick={handleRegistrationToggle}>Register</a>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRegistration && (
        <Register handleRegistrationToggle={handleRegistrationToggle} />
      )}
    </>
  );
}
