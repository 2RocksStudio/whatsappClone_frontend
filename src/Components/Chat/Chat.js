import React, { useEffect, useState } from "react";
import "./Chat.css";
import SearchIcon from "@material-ui/icons/Search";
import AttachIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import { Avatar, IconButton } from "@material-ui/core";
import axios from "../../axios/axios";
import moment from "moment";

const Chat = (props) => {
  const [messages, setmessages] = useState(props.messages);
  const [from, setfrom] = useState(props.from);
  const [user, setuser] = useState(props.user);
  const [message, setmessage] = useState("");
  useEffect(() => {
    setfrom(props.from);
  }, [props.from]);
  useEffect(() => {
    setuser(props.user);
  }, [props.user]);
  useEffect(() => {
    setmessages(props.messages);
    document
      .querySelector(".chat_body")
      .scrollTo(0, document.querySelector(".chat_body").scrollHeight);
  }, [props.messages, messages]);

  const postNewMessage = (e) => {
    e.preventDefault();
    axios
      .post("/message/new", {
        message: message,
        name: from,
        timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
        received: false,
        by: user,
      })
      .then((res) => {
        console.log(res);
        setmessage("");
      });
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_header_info">
          <h3>{from}</h3>
          <p>Last ...</p>
        </div>
        <div className="chat_right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message, index) => {
          if (
            (message.name === from || message.name === user) &&
            (message.by == user || message.by == from)
          )
            return (
              <p
                className={`chat_message ${
                  message.name === from ? "chat_reciever" : ""
                }`}
                key={index}
              >
                <span className="name">{message.by}</span>
                {message.message}
                <span className="time">{message.timestamp}</span>
              </p>
            );
        })}

        {/* 
        <p className="chat_message chat_reciever">
          <span className="name">Name</span>
          This message
          <span className="time">0123456</span>
        </p>

        <p className="chat_message">
          <span className="name">Name</span>
          This message
          <span className="time">0123456</span>
        </p> */}
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form onSubmit={postNewMessage}>
          <input
            placeholder="Type a message"
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
          />
          <button type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
