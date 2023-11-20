import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./layouts/login";
import Register from "./components/register";
import Homescreen from "./layouts/homescreen";
import { app } from "./firebase";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import "./App.css";
const auth = getAuth();
function App() {
  const [user, setUser] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setChatClient(null);
        localStorage.removeItem("user");
        localStorage.removeItem("streamuser");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
    chatClient.disconnectUser();
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    }
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              user ? (
                <Homescreen
                  chatClient={chatClient}
                  setChatClient={setChatClient}
                  user={user}
                  handleSignout={handleSignout}
                />
              ) : (
                <Login setChatClient={setChatClient} setUser={setUser} />
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
