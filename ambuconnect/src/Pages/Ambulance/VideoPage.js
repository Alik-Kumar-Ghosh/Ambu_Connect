import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/VideoCall.css";
import BannerBackground from "../../Assets/home-banner-background.png";
import Navbar from "../../HomePage/Navbar";
import { useUser } from "../UserContext";
import { Client, Databases, ID } from "appwrite";
import conf from "../../conf/conf";

const VideoPage = () => {
  const [roomID, setRoomID] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if(roomID.length<1){
      alert("Give a ID")
    }
    else{
    navigate(`/room/${roomID}`);
    }
  };



//listing hosp
  const { userName, userId, userEmail } = useUser();
  const [hospitalData, setHospitalData] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const client = new Client();
  const databases = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(conf.appwriteProjectId); // Your project ID


  useEffect(() => {
    let promise = databases.listDocuments(
      conf.appwriteDbId,
      conf.appwriteCollIdHosp
    );
    promise
      .then((response) => setHospitalData(response.documents))
      .catch((error) => console.error(error));
  }, []);

  const handleSelectHospital = (hospital) => {
    setSelectedHospital(hospital);
    setShowDropdown(false);
  };

const sendEmail = () => {
    if(roomID.length<1&&roomID===0){
      alert("Give a ID")
    }
    else{
      console.log("in else")
      //send Email API Call
      const url = "https://663294d469275164579a.appwrite.global/?email=";
      fetch(url + selectedHospital.Hospital_Email+"&id="+roomID)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Handle the response data here
        })
        .catch((error) => {
          console.error(error); // Handle any errors that occur during the fetch
        });
        handleJoin();
    }
}

  return (
    <>
      <Navbar></Navbar>
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="vc">
          <h1>VIDEO CONSULTATION</h1>
          <br />
          <input
            className="vc-id"
            type="text"
            placeholder="Enter Room ID"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
          />
          <div>
        
        <div style={{ position: "relative" }}>
                <label className="plabel">SELECT A HOSPITAL &nbsp;</label>
                <input
                  className="np-input"
                  type="text"
                  value={selectedHospital ? selectedHospital.Hospital_Name : ""}
                  placeholder="Select a hospital"
                  onClick={() => setShowDropdown(!showDropdown)}
                  readOnly
                />
                {showDropdown && (
                  <ul className="ulcss"
                    style={{
                      top: "100%",
                      left: 0,
                      zIndex: 1,
                    }}
                  >
                    {hospitalData.map((hospital, index) => (
                      <li className="chosp" 
                        key={index}
                        onClick={() => handleSelectHospital(hospital)}
                      >
                        {hospital.Hospital_Name} - <span style={{color:"blue"}}></span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {selectedHospital && (
                <>
                <div>
                  <h3>Hospital Email:</h3>
                  <p>{selectedHospital.Hospital_Email}</p>
                </div>
                <div>
                  <button className="vc-btn" onClick={sendEmail}>Send ID and Join</button>
                </div>
                </>
              )}
        </div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
