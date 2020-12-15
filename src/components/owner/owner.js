import React from "react";
import "./owner.css";

const Owner = props => {
  return (
    <div>
      <div className="owner-container">
        <img
          className="owner-edit"
          onClick={() => props.onClickImage(props.values)}
          src="/asset/img/pencil.png"
        />
        <p className="owner-answer">{props.message}</p>
      </div>
    </div>
  );
};

export default Owner;
