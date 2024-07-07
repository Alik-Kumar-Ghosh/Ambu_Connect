import React, { memo, useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { Client, Databases, Query } from "appwrite";
import conf from "../../conf/conf";
import Navbar from "../../HomePage/Navbar";
import "../Style/HospitalDas.css";
import active from "../../Assets/active_opt.png";
import hcompleted from "../../Assets/hcompleted_opt.png";
import BannerBackground from "../../Assets/home-banner-background.png";
import plus from "../../Assets/plus-btn.png";
import minus from "../../Assets/minus-btn.png";

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(conf.appwriteProjectId); // Your project ID

const HospitalDas = () => {
  const [availableBeds, setAvailableBeds] = useState(1);
  const { userName, userId, userEmail } = useUser();

  const incrementBeds = () => {
    setAvailableBeds(availableBeds + 1);
  };

  const decrementBeds = () => {
    if (availableBeds > 0) {
      setAvailableBeds(availableBeds - 1);
    }
  };

  // Define the data you want to update
  const newData = {
    Beds: availableBeds,
  };

  const loadBed = () => {
    databases
      .listDocuments(conf.appwriteDbId, conf.appwriteCollIdHosp, [
        Query.equal("Hospital_Email", userEmail),
      ])
      .then((response) => {
        setAvailableBeds(response.documents[0].Beds);
      })
      .catch((error) => {
        console.error("Error loading beds:", error);
      });
  };

  useEffect(() => {
    if (userEmail) {
      loadBed() // Call loadBed after 8 seconds
    }
  }, [userEmail]);

  const updateBeds = async () => {
    databases
      .listDocuments(conf.appwriteDbId, conf.appwriteCollIdHosp, [
        Query.equal("Hospital_Email", userEmail),
      ])
      .then((response) => {
        response.documents.forEach((document) => {
          const documentId = document.$id;
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
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="hdas-container">
          <h1 className="das-h1">{userName} DASHBOARD</h1>
          <div className="hdas-menu das-grp1">
            <div data-aos="flip-down" data-aos-duration="700" className="hmenu-opt1 menu-opt">
              <a href="/casecompletedhosp">
                <img src={hcompleted} alt="" />
              </a>
              <a className="m" href="/casecompletedhosp">
                CASES COMPLETED
              </a>
            </div>
            <div data-aos="flip-down" data-aos-duration="700" className="hmenu-opt2 menu-opt">
              <h2>AVAILABLE BEDS</h2>
              <div className="ava-beds">
                <button className="meter" onClick={incrementBeds}>
                  <img src={plus} alt="" />
                </button>
                <p>{availableBeds}</p>
                <button className="meter" onClick={decrementBeds}>
                  <img src={minus} alt="" />
                </button>
              </div>
              <br />
              <button className="login update-btn" onClick={updateBeds}>
                UPDATE
              </button>
            </div>
            <div data-aos="flip-down" data-aos-duration="700" className="hmenu-opt1 menu-opt">
              <a href="/activecaseshosp">
                <img src={active} alt="" />
              </a>
              <a className="m" href="/activecaseshosp">
                ACTIVE CASES
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(HospitalDas);
