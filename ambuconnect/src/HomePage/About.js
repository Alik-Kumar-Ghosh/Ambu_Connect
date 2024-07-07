import React, { useState } from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import PopupBox from "./PopupBox";
import "./popupbox.css"

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="about-section-container" id="about">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div data-aos="fade-down-left" className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div  data-aos="fade-down-right" className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Revolutionizing Emergency Medical Services
        </h1>
        <p className="primary-text">
          At AmbuConnect, our mission is to revolutionize the realm of emergency
          medical services through the introduction of a state-of-the-art
          real-time patient monitoring and data management system.
        </p>
        <p className="primary-text">
          Join us as we pave the way for a new era in emergency medical
          services, dedicated to ensuring timely and effective care when it
          matters most.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button onClick={openPopup} className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>{isOpen && <PopupBox className="close-btn" handleClose={closePopup} />}
        </div>
      </div>
    </div>
  );
};

export default About;
//     <button onClick={openPopup}>Open Video Popup</button>{isOpen && <PopupBox handleClose={closePopup} />}
