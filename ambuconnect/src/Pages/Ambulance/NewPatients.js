import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { Client, Databases, ID, Query } from "appwrite";
import conf from "../../conf/conf";
import Navbar from "../../HomePage/Navbar";
import BannerBackground from "../../Assets/home-banner-background.png";
import "../Style/NewPatients.css";

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(conf.appwriteProjectId); // Your project ID

const NewPatients = () => {

  // Remove the userName prop
  const navigate = useNavigate();
  const { userName, userId, userEmail } = useUser();
  const [hospitalData, setHospitalData] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Access userName from the user context
  const [userData, setUserData] = useState({
    Patient_name: "",
    Age: "",
    Gender: "",
    Condition: "",
    Other: "",
    Heart: "",
    BP: "",
    Temp: "",
    Oxy: "",
    Nurse: "",
    NurseId: "",
    Symptoms: "",
    conc: "",
    severity: "",
    preformed: "",
    medi: "",
    hosp_name: "",
    hosp_email: "",
  });

  const dataFunc = async () => {
    // APPWRITE CONFIGURATION
    const DataSendProcess = databases.createDocument(
      conf.appwriteDbId,
      conf.appwriteCollectionId,
      ID.unique(),
      {
        Patient_name: userData.Patient_name,
        ambu_id: userId,
        Ambu_Email: userEmail,
        Age: parseInt(userData.Age),
        Gender: userData.Gender,
        Condition: userData.Condition,
        Other: userData.Other,
        Heart: parseInt(userData.Heart),
        BP: parseInt(userData.BP),
        temp: parseFloat(userData.Temp),
        oxygen: parseFloat(userData.Oxy),
        nurse_name: userData.Nurse,
        Nurse_ID: userData.NurseId,
        Symptoms: userData.Symptoms,
        Conciousness: userData.conc,
        Severity: userData.severity,
        INTERVENTIONS: userData.preformed,
        Medication: userData.medi,
        Hospital_Name: selectedHospital.Hospital_Name,
        Hospital_Email: selectedHospital.Hospital_Email,
      }
    );
    DataSendProcess.then(
      function (response) {
        console.log(response);
        alert("Data Submitted successfully");
        notificationServices();
        navigate("/ambudas");
      },
      function (error) {
        alert(error);
      }
    );
  };

  //Function for notifying concerned Hospital using appwrite cloud functions
  function notificationServices() {
    const url = "https://663294d469275164579a.appwrite.global/?email=";

    fetch(url + selectedHospital.Hospital_Email+"&id=0")
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
  }

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



/*

* Use beddec() function in datafunc after alert
//for updating beds -1 whenever new patient is added 


const [availableBeds, setAvailableBeds] = useState(1);

const newData = {
  Beds: availableBeds-1,
};
 
const beddec = async () =>{
  databases
  .listDocuments(conf.appwriteDbId, conf.appwriteCollIdHosp, [
    Query.equal("Hospital_Email", selectedHospital.Hospital_Email),
  ])
  .then((response) => {
    // Update each document
    setAvailableBeds(response.documents[0].Beds)
    response.documents.forEach((document) => {
      const documentId = document.$id; // Get the document ID
      databases
        .updateDocument(
          conf.appwriteDbId,
          conf.appwriteCollIdHosp,
          documentId,
          newData
        )
        .then((updatedDocument) => {
          console.log("Document updated successfully:", updatedDocument); 
        })
        .catch((error) => {
          console.error("Error updating document:", error);
        });
    });
  })
  .catch((error) => {
    console.error("Error listing documents:", error);
  });
} 
  
*/


  return (
    <>
      <Navbar></Navbar>
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div  data-aos="fade-right" data-aos-duration="700" id="login-main">
          <div id="login-form">
            <h2 id="login-h2">NEW PATIENT DETAILS</h2>
            <label className="plabel">NAME</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Name"
              onChange={(e) =>
                setUserData({ ...userData, Patient_name: e.target.value })
              }
            />
            <label className="plabel">AGE</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Age"
              onChange={(e) =>
                setUserData({ ...userData, Age: e.target.value })
              }
            />
            <label className="plabel">GENDER</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Gender"
              onChange={(e) =>
                setUserData({ ...userData, Gender: e.target.value })
              }
            />
            <label className="plabel">CONDITION</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Condition"
              onChange={(e) =>
                setUserData({ ...userData, Condition: e.target.value })
              }
            />
            <label className="plabel">OTHER</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Other"
              onChange={(e) =>
                setUserData({ ...userData, Other: e.target.value })
              }
            />
            <label className="plabel">HEART RATE</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Heart"
              onChange={(e) =>
                setUserData({ ...userData, Heart: e.target.value })
              }
            />
            <label className="plabel">BLOOD PRESSURE</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="BP"
              onChange={(e) => setUserData({ ...userData, BP: e.target.value })}
            />
            <label className="plabel">BODY TEMPERATURE</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Temp"
              onChange={(e) =>
                setUserData({ ...userData, Temp: e.target.value })
              }
            />
            <label className="plabel">OXYGEN</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Oxy"
              onChange={(e) =>
                setUserData({ ...userData, Oxy: e.target.value })
              }
            />
            <label className="plabel">NURE NAME</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Nurse"
              onChange={(e) =>
                setUserData({ ...userData, Nurse: e.target.value })
              }
            />
            <label className="plabel">NURSE ID</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="NurseID"
              onChange={(e) =>
                setUserData({ ...userData, NurseId: e.target.value })
              }
            />
            <label className="plabel">SYMPTOMS</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Symptoms"
              onChange={(e) =>
                setUserData({ ...userData, Symptoms: e.target.value })
              }
            />
            <label className="plabel">STATE OF CONCIOUSNESS (Yes/No)</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Conciouseness"
              onChange={(e) =>
                setUserData({ ...userData, conc: e.target.value })
              }
            />
            <label className="plabel">SEVERITY</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Severity"
              onChange={(e) =>
                setUserData({ ...userData, severity: e.target.value })
              }
            />
            <label className="plabel">Intervention Performed</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Preformed"
              onChange={(e) =>
                setUserData({ ...userData, preformed: e.target.value })
              }
            />
            <label className="plabel">MEDICATIONS</label>
            <input
              className="np-input"
              type="text"
              id="login-input"
              placeholder="Medications"
              onChange={(e) =>
                setUserData({ ...userData, medi: e.target.value })
              }
            />

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
                      {hospital.Hospital_Name} - <span style={{color:"blue"}}>{hospital.Beds} Beds</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {selectedHospital && (
              <div>
                <h3>Hospital Email:</h3>
                <p>{selectedHospital.Hospital_Email}</p>
              </div>
            )}
            <button className="login" onClick={dataFunc}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(NewPatients);
