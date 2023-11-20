import "./homescreen.css";
import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
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
import Sidebar from "../components/sidebar";
export default function Homescreen({
  user,
  handleSignout,
  chatClient,
  setChatClient,
}) {
  const filter = { type: "messaging", members: { $in: [user.uid] } };
  const sort = { last_message_at: -1 };
  const [channelName, setChannelName] = useState("");
  // const [channel, setChannel] = useState(null);
  const handleCreateChannel = async () => {
    const channel = chatClient.channel("messaging", "redbull", {
      image: "https://picsum.photos/200",
      name: "Randoms",
      members: [user.uid, "e86JGI3s3uWqzuhirWTLri7bWf42"],
    });
    await channel.watch();
    console.log(chatClient);
  };
  return (
    <>
      <div className="home-container">
        <h1>
          Hi! {user.displayName}{" "}
          <button onClick={handleSignout}>Signout</button>
        </h1>

        {/* <Chat client={chatClient} theme="messaging dark">
          <ChannelList sort={sort} filters={filter} />
          <Channel />
        </Chat> */}
        <Sidebar chatClient={chatClient} />
        <div className="chat-container">
          {/* <Chat client={chatClient} theme="messaging dark">
            <ChannelList className="channellist" sort={sort} filters={filter} />
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
            </Channel>
          </Chat> */}
        </div>

        {/* <Chat client={chatClient} theme="messaging dark">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
          </Channel>
        </Chat> */}
      </div>
    </>
  );
}
