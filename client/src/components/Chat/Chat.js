import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar.js";
import Input from "../Input/Input.js";
import Messages from "../Messages/Messages.js";
import UsersList from "../UsersList/UsersList";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [channel, setChannel] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    //const data = queryString.parse(location.search);
    const { name, channel } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    //console.log(location.search);
    //console.log(data);
    //console.log(name, channel);

    setName(name);
    setChannel(channel);

    socket.emit("join", { name, channel }, error => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };

    // console.log(socket);
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("channelData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  //funciton for sending msgs

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  //console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar channel={channel} />
        {/*<input
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />*/}
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <UsersList users={users} />
    </div>
  );
};

export default Chat;
