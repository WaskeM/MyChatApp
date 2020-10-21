import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [channel, setChannel] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join to my realtime chat app</h1>
        <div>
          <input
            placeholder="Username"
            className="joinInput"
            type="text"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Channel"
            className="joinInput mt-20"
            type="text"
            onChange={event => setChannel(event.target.value)}
          />
        </div>
        <Link
          onClick={event => (!name || !channel ? event.preventDefault() : null)}
          to={`/chat?name=${name}&channel=${channel}`}
        >
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
