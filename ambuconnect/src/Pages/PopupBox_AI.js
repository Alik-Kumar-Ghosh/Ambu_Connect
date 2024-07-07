import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import './Style/popupboxai.css';

const PopupBox_AI = ({ handleClose, inst }) => {
  return (
    <div className="popup-box1">
      <div className="popup-inner1">
        <button className="close-btn1" onClick={handleClose}>
          <IoMdCloseCircle />
        </button>
        <div dangerouslySetInnerHTML={{ __html: inst }}></div>
      </div>
    </div>
  );
};

export default PopupBox_AI;
