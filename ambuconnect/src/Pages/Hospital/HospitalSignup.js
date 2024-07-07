import React, { useState } from "react";
import conf from "../../conf/conf";
import { useNavigate } from "react-router-dom";
import { account } from "../../appwrite/auth";
import { Client, Databases, ID } from "appwrite";
import "../Style/HospitalSignup.css";
import Navbar from "../../HomePage/Navbar";
import BannerBackground from "../../Assets/home-banner-background.png";

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(conf.appwriteProjectId); // Your project ID

const HospitalSignup = () => {
  const [userData, setUserData] = useState({
    nameOfHosp: "",
    email: "",
    password: "",
    hospitalType: "",
    address: "",
    addressUrl: "",
  });
  const navigate = useNavigate();

  const signupFunc = async () => {
    const signUpProcess = account.create(
      ID.unique(),
      userData.email,
      userData.password,
      "Hospital"
    );
    signUpProcess.then(
      function (response) {
        console.log(response);
        //alert("SignUp successfully");
        navigate("/hospitallogin");
      },
      function (error) {
        alert(error);
      }
    );

    const DataSendProcessHosp = databases.createDocument(
      conf.appwriteDbId,
      conf.appwriteCollIdHosp,
      ID.unique(),
      {
        Hospital_Email: userData.email,
        Hospital_Name: userData.nameOfHosp,
        Type: userData.hospitalType,
        Address: userData.address,
        Address_url: userData.addressUrl,
      }
    );
    DataSendProcessHosp.then(
      function (response) {
        console.log(response);
        alert("Signup successfully");
        navigate("/hospitaldas");
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
        <div  data-aos="fade-right" data-aos-duration="700"  className="hsignup-container">
          <h2 id="login-h">HOSPITAL REGISTRATION</h2>
          <label className="hlabel" for="name">
            EMAIL <span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="hinput"
            type="email"
            id="login-input"
            placeholder="Email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <label className="hlabel" for="name">
            PASSWORD <span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="hinput"
            type="password"
            id="login-input"
            placeholder="Password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <label className="hlabel" for="name">
            NAME OF HOSPITAL <span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="hinput"
            type="text"
            id="login-input"
            placeholder="Name of hospital"
            onChange={(e) =>
              setUserData({ ...userData, nameOfHosp: e.target.value })
            }
          />
          <label className="hlabel" for="name">
            HOSPITAL Type<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="hinput"
            type="text"
            id="login-input"
            placeholder="Hospital Type"
            onChange={(e) =>
              setUserData({ ...userData, hospitalType: e.target.value })
            }
          />
          <label className="hlabel" for="name">
            ADDRESS <span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="hinput"
            type="text"
            id="login-input"
            placeholder="Address"
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
          />
          <label className="hlabel" for="name">
            ADDRESS URL
          </label>
          <input
            className="hinput"
            type="text"
            id="login-input"
            placeholder="Address URl"
            onChange={(e) =>
              setUserData({ ...userData, addressUrl: e.target.value })
            }
          />
          <button className="login hlogin" onClick={signupFunc} id="login-btn">
            REGISTER
          </button>
        </div>
      </div>
    </>
  );
};

export default HospitalSignup;
