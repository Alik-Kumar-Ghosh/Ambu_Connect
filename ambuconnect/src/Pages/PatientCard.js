import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import "./Style/PatientCard.css";
import Prof from "../Assets/Card_img.png";
import { MdDownloadForOffline } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
import PopupBox_AI from "./PopupBox_AI";
import { GoogleGenerativeAI } from "@google/generative-ai";
import conf from '../conf/conf.js';

const PatientCard = ({ patient }) => {
  const [isOpen, setIsOpen] = useState(false); // Initialize with false
  const [inst, setInst] = useState("Loading ...    <br> <br> Disclaimer: This is AI genrated, expert supervision advised");
  const openPopup = () => {
    setIsOpen(true);
    aiRun();
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  // Simulated AI Call (Uncomment and implement when API key is available)
  const genAI = new GoogleGenerativeAI(
    conf.ai
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const [aiResponse, setResponse] = useState();

  async function aiRun() {
    const prompt = `You are a meticulous medical professional dedicated to ensuring accurate patient care. Your primary objective is to assess the condition of patients accurately and provide relevant first aid recommendations based on the available information. 

    Please evaluate the following patient details:
    
    - Medical Condition: ${patient.Condition}
    - Patient Age: ${patient.Age}
    - Patient Gender: ${patient.Gender}
    - Patient Condition: ${patient.Condition}
    - Other Details: ${patient.Other}
    - Heart Rate: ${patient.Heart}
    - Blood Pressure: ${patient.BP}
    - Temperature:${patient.temp}
    - Oxygen Level:${patient.oxygen}
    - Symptoms:${patient.Symptoms}
    
    Given this patient's details, assess the medical condition, analyze the symptoms, and provide appropriate first aid measures and initial treatment recommendations. Consider the patient's age, gender, vital signs (heart rate, blood pressure, temperature, and oxygen level), and any additional details provided to offer comprehensive and effective support.
    
    For example, if the patient is experiencing a severe allergic reaction with symptoms such as difficulty breathing, rapid heart rate, and low blood pressure, recommend administering epinephrine (if available) and calling emergency services immediately in india its 102.
     
    and give the output as html tag for decoration of text.  
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log(response)
    var text = response.text();
    text = text.replace("html", " ");
    setResponse(text);
    setInst(text);
  }

  const downloadPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    const padding = 40;

    page.drawText("Patient Details", {
      x: padding,
      y: height - padding,
      size: fontSize + 5,
      color: rgb(0, 0, 0),
    });

    const details = `
      Patient Name: ${patient.Patient_name}
      Nurse ID: ${patient.Nurse_ID}
      Nurse name: ${patient.nurse_name},
      Patient Created on: ${patient.$createdAt}
      Medical Condition: ${patient.Condition}
      Hospital Name: ${patient.Hospital_Name}
      Hospital Email: ${patient.Hospital_Email}
      Amublance id :${patient.ambu_id}
      Ambulance Email:${patient.Ambu_Email}
      Age:${patient.Age}
      Gender:${patient.Gender}
      Condition:${patient.Condition}
      Other details:${patient.Other}
      Heart:${patient.Heart}
      Blood Pressure:${patient.BP}
      Temperature:${patient.temp}
      Oxygen Level:${patient.oxygen}
      Symptoms:${patient.Symptoms}
      Conciousness:${patient.Conciousness}
      Severity:${patient.Severity}
      Interventions: ${patient.INTERVENTIONS}
      Medications: ${patient.Medication}
    `;

    page.drawText(details, {
      x: padding,
      y: height - padding * 2,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${patient.Patient_name}_details.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <div
        data-aos="zoom-in-up"
        data-aos-duration="700"
        className="card-container"
      >
        <div className="p_card">
          <div className="p_left">
            <img src={Prof} alt="" />
          </div>
          <div className="p_right">
            <p className="font-bold text-gray-800">{patient.Patient_name}</p>
            <p className="text-gray-600">Nurse ID: {patient.Nurse_ID}</p>
            <p className="text-gray-600">
              Medical Condition: {patient.Condition}
            </p>
            <p className="text-gray-600">
              Hospital Name: {patient.Hospital_Name}
            </p>
            <button onClick={downloadPdf}>
              <MdDownloadForOffline />
            </button>
            <button onClick={openPopup} >
              <GiBrain />
            </button>
            {isOpen && <PopupBox_AI handleClose={closePopup} inst={inst} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientCard;
