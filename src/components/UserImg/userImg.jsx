import React from "react";
import { Images } from "../../constants";
import "../Header/header.css";

const UserImg = (props) => {
  return (
    <>
      <div className={`userImg ${props.size === true ? 'sizeL' : ''}`}>
        <span className="rounded-circle">
          <img src={props.img} alt="userImg" width={props.width} />
        </span>
      </div>
    </>
  );
};

export default UserImg;
