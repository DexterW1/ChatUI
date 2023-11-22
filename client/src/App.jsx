import { useEffect, useState } from "react";
import Login from "./layouts/login";
import Homescreen from "./layouts/homescreen";
import { app } from "./firebase";
import { StreamChat } from "stream-chat";
import Loader from "./components/loader";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import "./App.css";

const auth = getAuth();

function App() {
  const [user, setUser] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSignout = async () => {
    await signOut(auth);
    setUser(null);
    setChatClient(null);
    localStorage.removeItem("user");
    localStorage.removeItem("streamuser");
    chatClient.disconnectUser();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const streamUser = {
          id: authUser.uid,
          name: authUser.displayName,
          image: "https://picsum.photos/200",
        };

        setUser(authUser);
        localStorage.setItem("user", JSON.stringify(authUser));
        localStorage.setItem("streamuser", JSON.stringify(streamUser));

        const client = StreamChat.getInstance(
          import.meta.env.VITE_STREAM_API_KEY
        );
        await client.connectUser(streamUser, client.devToken(authUser.uid));
        setChatClient(client);
      } else {
        // await signOut(auth);
        setUser(null);
        setChatClient(null);

        // Clean up user and Stream Chat client data
        localStorage.removeItem("user");
        localStorage.removeItem("streamuser");
      }
      if (loading) {
        // window.location.reload();
        setLoading(false);
      }
      // setLoading(false); // Mark loading as complete
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Return a loading indicator or any UI while authentication state is being checked
    return <div>Loading...</div>;
  }

  return (
    <>
      {user !== null ? (
        chatClient !== null ? (
          <Homescreen
            chatClient={chatClient}
            setChatClient={setChatClient}
            user={user}
            handleSignout={handleSignout}
          />
        ) : (
          <div>
            <Loader />
          </div>
        )
      ) : (
        <Login user={user} setChatClient={setChatClient} setUser={setUser} />
      )}
    </>
  );
}

export default App;
