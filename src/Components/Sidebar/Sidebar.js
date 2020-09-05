import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
import SidebarChat from "../SidebarChat/SidebarChat";
const rooms = ["Peter", "Mon", "Father", "Kelvin"];
const Sidebar = (props) => {
  const [user, setuser] = useState(props.user);
  useEffect(() => {
    setuser(props.user);
    setTimeout(() => {
      document.querySelectorAll(".sidebar_chat")[0].click();
    }, 100);
  }, [props.user]);
  return (
    <div className="sidebar">
      {/* header */}
      <div className="sidebar_header">
        <div className="sidebar_left">
          <Avatar src="https://scontent.fhkg1-1.fna.fbcdn.net/v/t1.0-1/cp0/p24x24/94688629_3398729363488714_6339042931969622016_n.jpg?_nc_cat=102&_nc_sid=dbb9e7&_nc_ohc=TrZ7uUA8Qx8AX95Acrj&_nc_ht=scontent.fhkg1-1.fna&oh=ad421c312c61e1f4bf3dbedd853ee177&oe=5F7A789F" />
          <p> I am</p>
          <select
            onChange={(e) => {
              props.changeUser(e.target.value);
            }}
          >
            <option value="Kelvin">Kelvin</option>
            <option value="Peter">Peter</option>
            <option value="Mon">Mon</option>
            <option value="Father">Father</option>
          </select>
        </div>
        <div className="sidebar_right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      {/* search */}
      <div className="sidebar_search">
        <div className="searchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        {rooms.map((room, i) => {
          if (room === user) return;
          return <SidebarChat setfrom={props.setfrom} name={room} key={i} />;
        })}
      </div>
      {/* rooms */}
    </div>
  );
};

export default Sidebar;
