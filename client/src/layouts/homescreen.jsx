import "./homescreen.css";
import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
  ChannelList,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import Sidebar from "../components/renderchannel";
import Nav from "../components/nav";
import Register from "../components/register";
import Rendermessage from "../components/rendermessage";
import Renderchannel from "../components/renderchannel";
export default function Homescreen({
  user,
  handleSignout,
  chatClient,
  setChatClient,
}) {
  const [channelID, setChannelID] = useState(null);
  const handleCreateChannel = async () => {
    const channel = chatClient.channel("messaging", "redbull", {
      image: "https://picsum.photos/200",
      name: "Randoms",
      members: [user.uid, "e86JGI3s3uWqzuhirWTLri7bWf42"],
    });
    await channel.watch();
    console.log(chatClient);
  };
  console.log("THis is channelID", channelID);
  return (
    <>
      <BrowserRouter>
        <div className="home-content-container">
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Renderchannel
                  chatClient={chatClient}
                  setChannelID={setChannelID}
                />
              }
            />
            <Route path="/Register" element={<Register />} />
            {channelID && (
              <Route
                path={`/Messages/{${channelID.id}}`}
                element={
                  <Rendermessage channel={channelID} chatClient={chatClient} />
                }
              />
            )}
          </Routes>
        </div>
        <div className="home-nav-container">
          <Nav />
          <button className="signoutBtn" onClick={handleSignout}>
            Signout
          </button>
        </div>
      </BrowserRouter>
    </>
  );
}
