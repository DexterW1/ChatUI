import React, { useState, useEffect } from "react";
import "./rendermessage.css";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  ChannelList,
} from "stream-chat-react";
export default function Rendermessage({ channel, chatClient }) {
  const handleInvite = () => {
    channel.inviteMembers(["e86JGI3s3uWqzuhirWTLri7bWf42"]);
  };
  return (
    <div className="message-container">
      <Chat client={chatClient} theme="messaging dark">
        <Channel channel={channel}>
          <div className="window-container">
            <Window>
              <div className="channelHeader">
                <h2>{channel.data.name}</h2>
                <button onClick={handleInvite}>Invite</button>
              </div>
              <ChannelHeader/>
              <MessageList />
              <MessageInput />
            </Window>
          </div>
        </Channel>
      </Chat>
    </div>
  );
}
