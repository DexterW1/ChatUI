import React from "react";
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
  return (
    <div className="message-container">
      <Chat client={chatClient} theme="messaging dark">
        <Channel channel={channel}>
          <div className="window-container">
            <Window>
              <div className="channelHeader">
                <h2>{channel.data.name}</h2>
              </div>
              <MessageList />
              <MessageInput />
            </Window>
          </div>
        </Channel>
      </Chat>
    </div>
  );
}
