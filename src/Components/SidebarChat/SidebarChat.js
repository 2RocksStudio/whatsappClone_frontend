import React from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
const SidebarChat = (props) => {
  return (
    <div
      className="sidebar_chat"
      onClick={() => {
        props.setfrom(props.name);
      }}
    >
      <Avatar />
      <div className="info">
        <h2>{props.name}</h2>
        <p>This message</p>
      </div>
    </div>
  );
};

export default SidebarChat;
