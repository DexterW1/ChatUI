import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./layouts/login";
import Register from "./components/register";
import Homescreen from "./layouts/homescreen";
import { app } from "./firebase";
import { getAuth, signOut } from "firebase/auth";
import "./App.css";
const auth = getAuth();
function App() {
  const [user, setUser] = useState(null);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              user ? (
                <Homescreen user={user} handleSignout={handleSignout} />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
