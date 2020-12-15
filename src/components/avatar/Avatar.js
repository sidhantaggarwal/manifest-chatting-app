import React from "react";
import "./avatar.css";

const Avatar = props => {
  return (
    <div style={{ display: props.dispFlag }}>
      <img
        src="/asset/img/henry.png"
        className="henry-avatar-s"
        alt="Avatar Image"
      />
    </div>
  );
};

export default Avatar;
