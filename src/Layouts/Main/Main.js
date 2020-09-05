import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Chat from "../../Components/Chat/Chat";
import Pusher from "pusher-js";
import axios from "../../axios/axios";

const Main = () => {
  const [messages, setmessages] = useState([]);
  const [from, setfrom] = useState("Peter");
  const [user, setuser] = useState("Kelvin");
  useEffect(() => {
    axios.get("/message/all").then((res) => {
      console.log(res.data);
      setmessages(res.data);
    });
  }, []);
  useEffect(() => {
    var pusher = new Pusher("a1d196191b1926dee4cb", {
      cluster: "ap1",
    });
    console.log("Bind");
    var channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      // alert(JSON.stringify(data));
      const newm = [...messages, data];
      setTimeout(() => {
        setmessages(newm);
      }, 100);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  const changeRoom = (name) => {
    setfrom(name);
  };

  const changeUser = (name) => {
    setuser(name);
  };
  return (
    <div className="app_body">
      <Sidebar setfrom={changeRoom} user={user} changeUser={changeUser} />
      <Chat messages={messages} user={user} from={from} />
    </div>
  );
};

export default Main;
