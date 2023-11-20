import React, { useEffect, useState } from "react";
import "./sidebar.css";
export default function Sidebar({ chatClient }) {
  const [channelData, setChannelData] = useState(null);
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
  if (!channelData) {
    return <div>loading</div>;
  }
  return (
    <>
      <div className="sidebar-container">
        {channelData.map((item) => (
          <div className="card">
            <div className="card-image-container">
              <img src={item.data.image} alt="image" />
            </div>
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
          </div>
        ))}
      </div>
    </>
  );
}
