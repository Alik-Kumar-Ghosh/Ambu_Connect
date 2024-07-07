// PopupBox.js
import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import ReactPlayer from 'react-player';
import './popupbox.css';

const PopupBox = ({ handleClose }) => {
  return (
    <div className="popup-box">
      <div className="popup-inner">
        <button className="close-btn" onClick={handleClose}>
          <IoMdCloseCircle />
        </button>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=j7mgLnMZ8Ng"
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default PopupBox;
