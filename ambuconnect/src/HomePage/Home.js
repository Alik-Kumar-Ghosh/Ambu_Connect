import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  function clickHosp(){
    navigate("/hospitallogin");
  }
function clickAmbu(){
    navigate("/login");
  }
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div  data-aos="fade-right" data-aos-duration="700" className="home-text-section">
          <h1 className="primary-heading">
            Redefining Emergency Healthcare Delivery
          </h1>
          <p className="primary-text">
            Introducing AmbuConnect – The Future of Emergency Medical Care
          </p>
          <div className="btn-grp">
              <button className="secondary-button" onClick={clickHosp}>Hospital</button>
              <button className="tertiary-button" onClick={clickAmbu}>Ambulance</button>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-duration="1000" className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
