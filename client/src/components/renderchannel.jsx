import React, { useEffect, useState } from "react";
import "./renderchannel.css";
import { Link } from "react-router-dom";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  ChannelList,
} from "stream-chat-react";
import Rendermessage from "./rendermessage";
function convertTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert to 12-hour format
  const formattedHours = hours % 12 || 12;
  const period = hours >= 12 ? "PM" : "AM";

  // Format the time
  const formattedTime = `${formattedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${period}`;
  return formattedTime;
}
export default function Renderchannel({ chatClient, setChannelID }) {
  const [channelData, setChannelData] = useState(null);
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    const filter = {
      type: "messaging",
      members: { $in: [chatClient.user.id] },
    };
    const sort = [{ last_message_at: -1 }];
    const fetchChannels = async () => {
      const channels = await chatClient.queryChannels(filter, sort, {
        watch: true, // this is the default
        state: true,
      });
      if (channels) {
        setChannelData(channels);
        console.log(channels);
      }
    };
    fetchChannels();
  }, []);
  const handleLoadMessage = (item) => {
    setChannel(item);
    setChannelID(item);
    console.log(item);
  };
  if (!channelData) {
    return <div>loading</div>;
  }
  const filter = { type: "messaging", members: { $in: [chatClient.user.id] } };
  const sort = { last_message_at: -1 };
  return (
    <>
      <div className="sidebar-container">
        {channelData.map((item) => (
          <Link
            to={`/Messages/{${item.id}}`}
            key={item.cid}
            onClick={() => handleLoadMessage(item)}
          >
            <div className="card">
              <div className="card-image-container">
                <img src={item.data.image} alt="image" />
              </div>
              <div className="card-right-container">
                <div className="card-preview">
                  <h1>{item.data.name}</h1>
                  <p>
                    {
                      item.state.messageSets[0].messages[
                        item.state.messageSets[0].messages.length - 1
                      ].text
                    }
                  </p>
                </div>
                <div className="card-time-container">
                  <div className="count-container">
                    {item.countUnread() !== 0 && <p>{item.countUnread()}</p>}
                  </div>
                  <p>{convertTime(item.state.last_message_at)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {channel && <Rendermessage chatClient={chatClient} channel={channel} />}
        {/* <Chat client={chatClient}>
          <ChannelList filters={filter} sort={sort} />
          <Channel />
        </Chat> */}
      </div>
    </>
  );
}
