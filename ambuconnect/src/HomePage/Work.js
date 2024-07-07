import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Real-time Monitoring and Data Integration",
      text: " AmbuConnect's real-time monitoring capabilities and data integration features have enabled medical teams to make informed decisions and provide timely interventions, ultimately improving patient outcomes.​",
    },
    {
      image: ChooseMeals,
      title: "Enhanced Communication and Coordination",
      text: "The integration of advanced communication tools has facilitated seamless coordination between ambulance crews, healthcare facilities, and medical professionals, resulting in more efficient patient care.​",
    },
    {
      image: DeliveryMeals,
      title: "Positive Impact on Patient Survival Rates",
      text: " Studies have shown a positive correlation between the use of AmbuConnect and increased patient survival rates, particularly in critical situations where timely intervention is crucial.​",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div data-aos="zoom-in" data-aos-duration="800" className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          At AmbuConnect, emergency care delivery revolves around real-time
          patient monitoring and data management.We ensure that patients receive
          timely and effective interventions during critical moments. Our system
          operates through a three-step process:
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div data-aos="zoom-out-up" className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
