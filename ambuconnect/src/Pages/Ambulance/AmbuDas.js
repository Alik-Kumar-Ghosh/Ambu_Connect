import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../HomePage/Navbar";
import BannerBackground from "../../Assets/home-banner-background.png";
import { useUser } from "../UserContext"; // Import the useUser hook
import "../Style/AmbuDas.css";
import newpatient from "../../Assets/new_patient_opt.png";
import completed from "../../Assets/completed_opt.png";
import active from "../../Assets/active_opt.png";
import contact from "../../Assets/contact_opt.png";
import vc from "../../Assets/vc.png";

const AmbuDas = () => {
  const navigate = useNavigate();
  const { userName, userId, userEmail } = useUser(); // Destructure userId from useUser
  const [showNewPatients, setShowNewPatients] = useState(false);

  const onClickNewP = () => {
    setShowNewPatients(true);
    // Optionally, you can navigate to a specific route here
    navigate("/newpatients");
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
    <div className="">
    
          <div className="das-grp1">
            {/* menu-option 1 */}
            <div data-aos="flip-down" data-aos-duration="700" className="menu-opt">
              <a href="/cases_completed">
                <img src={completed} alt="" />
              </a>
              <a className="m" href="/cases_completed">
                CASES COMPLETED
              </a>
            </div>
            {/* menu-option 2 */}
            <div data-aos="flip-down" data-aos-duration="700" className="menu-opt">
              <a href="/Active_cases">
                <img src={active} alt="" />
              </a>
              <a className="m" href="/Active_cases">
                ACTIVE CASES
              </a>
            </div>
            {/* menu-option 3 */}
            <div data-aos="flip-down" data-aos-duration="700"  className="menu-opt">
              <a href="/Contact_Hospital">
                <img src={contact} alt="" />
              </a>
              <a className="m" href="/Contact_Hospital">
                CONTACT HOSPITAL
              </a>
            </div>
          </div>
          <div  className="das-grp1">
            <div data-aos="flip-down" data-aos-duration="700"  className="menu-opt">
              <a href="#" onClick={onClickNewP}>
                <img src={newpatient} alt="" />
              </a>
              <a href="#" className="m" onClick={onClickNewP}>
                ADD NEW PATIENT
              </a>
            </div>
              <div data-aos="flip-down" data-aos-duration="700"  className="menu-opt">
              <a href="/videopage">
                <img src={vc} alt="" />
              </a>
              <a href="/videopage" className="m">
                DOCTOR CONSULTATION
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AmbuDas);
