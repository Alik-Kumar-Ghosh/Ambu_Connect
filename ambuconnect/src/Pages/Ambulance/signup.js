import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../../appwrite/auth";
import { ID } from "appwrite";
import Navbar from "../../HomePage/Navbar";
import Pulse from "../../Assets/pulse_logo.png";
import BannerBackground from "../../Assets/home-banner-background.png";
import "../Style/login.css";
import { GrMail } from "react-icons/gr";

import { FaLock } from "react-icons/fa";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signupFunc = async () => {
    const signUpProcess = account.create(
      ID.unique(),
      userData.email,
      userData.password,
      "Ambulance"
    );
    signUpProcess.then(
      function (response) {
        alert("SignUp successfully");
        navigate("/login");
      },
      function (error) {
        alert(error);
      }
    );
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        {/* <div className="login-main"> */}
        <div  data-aos="fade-right" data-aos-duration="700"  id="login-main">
          <div id="login-form">
            <h2 id="login-h2">AMBULANCE SIGNUP</h2>
            <img className="pulse-logo" src={Pulse} alt="" />
            <div className="input-box">
              <GrMail className="icon" />
              <input
                type="email"
                id="login-input"
                placeholder="EMAIL"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
            <div className="input-box">
              <FaLock className="icon" />
              <input
                type="password"
                id="login-input"
                placeholder="PASSWORD"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
            <div className="input-box">
              <FaLock className="icon" />
              <input
                type="password"
                id="login-input"
                placeholder="CONFIRM PASSWORD"
              />
            </div>
            <button className="login" onClick={signupFunc} id="login-btn">
              SIGNUP
            </button>
            <Link className="already-login" to="/login">ALREDAY HAVE AN ACCOUNT ? <span className="s"> LOGIN </span> </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
