import React, { memo, createContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Ambulance/signup";
import Login from "./Pages/Ambulance/Login";
import { UserProvider } from "./Pages/UserContext";
import Accounts from "./Pages/Accounts";
import HospitalSignup from "./Pages/Hospital/HospitalSignup";
import AmbuDas from "./Pages/Ambulance/AmbuDas";
import NewPatients from "./Pages/Ambulance/NewPatients";
import HospitalDas from "./Pages/Hospital/HospitalDas";
import Logout from "./Pages/Ambulance/Logout";
import HospitalLogin from "./Pages/Hospital/HospitalLogin";
import ActiveCaseAmbu from "./Pages/Ambulance/ActiveCaseAmbu";
import CaseCompHosp from "./Pages/Hospital/CaseCompHosp";
import ActiveCaseHosp from "./Pages/Hospital/ActiveCaseHosp";
import CaseCompAmbu from "./Pages/Ambulance/CaseCompAmbu";
import HomePage from "./HomePage/HomePage";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactHospital from "./Pages/Hospital/ContactHospital";
import VideoCall from "./Pages/Ambulance/VideoCall";
import VideoPage from "./Pages/Ambulance/VideoPage";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

//Create a context to hold the user state
const UserContext = createContext();

const App = () => {
  //  Define state and methods to update the user state
  const [user, setUser] = useState(null);

  useEffect(() => {
    AOS.init();
  }, [])


  //  Wrap your App component with the UserProvider
  return (
    <UserProvider value={{ user, setUser }}>
      {" "}
      {/* Wrap App with UserProvider */}
      <>
      <Analytics/>
      <SpeedInsights/>
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<  HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hospitallogin" element={<HospitalLogin />} />
            <Route path="/account" element={<Accounts />} />
            <Route path="/ambudas" element={<AmbuDas />} />
            <Route path="/hospitaldas" element={<HospitalDas />} />
            <Route path="/hospitalSignup" element={<HospitalSignup />} />
            <Route path="/newpatients" element={<NewPatients />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/casecompletedhosp" element={<CaseCompHosp />} />
            <Route path="/activecaseshosp" element={<ActiveCaseHosp />} />
            <Route path="/Active_cases" element={<ActiveCaseAmbu />} />
            <Route path="/cases_completed" element={<CaseCompAmbu />} />
            <Route path="/contact_hospital" element={<ContactHospital />} />
            <Route path="/videoPage" element={<VideoPage />} />
            <Route path="/room/:roomID" element={<VideoCall />} />
            

          </Routes>
        </BrowserRouter>
      </>
    </UserProvider>
  );
};

export default memo(App);





