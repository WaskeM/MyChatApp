import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./UsersList.css";

const UsersList = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h3>Online users:</h3>
        <div className="activeContainer">
          <h3>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h3>
        </div>
      </div>
    ) : null}
  </div>
);

export default UsersList;
