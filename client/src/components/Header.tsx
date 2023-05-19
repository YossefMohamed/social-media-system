import React from "react";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <a className=" item">Home</a>
      <a className="item">Messages</a>
      <a className="item">Friends</a>
      <div className="right menu">
        <a className="ui item">Logout</a>
      </div>
    </div>
  );
};

export default Header;
