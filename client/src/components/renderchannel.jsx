import React, { useEffect, useState } from "react";
import "./renderchannel.css";
import { Link } from "react-router-dom";
import Modal from "./modal";
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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => {
    setShowCreateModal(false);
    setShowDeleteModal(false);
    window.location.reload();
  };
  useEffect(() => {
    console.log("This is chatClient right before filter", chatClient);
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
      <div className="channel-container">
        <button
          onClick={() => setShowDeleteModal(true)}
          className=" channel-container-btn delete-channel-btn"
        >
          <ion-icon name="close-circle-outline"></ion-icon>
        </button>
        <Modal
          showCreateModal={showCreateModal}
          showDeleteModal={showDeleteModal}
          onClose={handleClose}
          chatClient={chatClient}
          channelData={channelData}
        />
        <button
          onClick={() => setShowCreateModal(true)}
          className="channel-container-btn create-channel-btn"
        >
          <ion-icon name="create-outline"></ion-icon>
        </button>
        <Modal
          showCreateModal={showCreateModal}
          showDeleteModal={showDeleteModal}
          onClose={handleClose}
          chatClient={chatClient}
          channelData={channelData}
        />
      </div>
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
                    {item.state.messageSets[0].messages.length > 0 &&
                      item.state.messageSets[0].messages[
                        item.state.messageSets[0].messages.length - 1
                      ].text}
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
      </div>
    </>
  );
}
