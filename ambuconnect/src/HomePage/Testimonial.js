import React from "react";
import ProfilePic from "../Assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper" id="testimonials">
      <div data-aos="zoom-out-up" className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
          How AmbuConnect saved their life in those critical situations.
        </p>
      </div>
      <div data-aos="zoom-out-down" className="testimonial-section-bottom">
        <img src={ProfilePic} alt="" />
        <p>
          While AmbuConnect offers significant benefits, challenges such as data
          security, resource allocation, and training need to be addressed.
          However, these challenges present opportunities for further innovation
          and improvement in emergency medical services.​
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>John Doe</h2>
      </div>
    </div>
  );
};

export default Testimonial;
