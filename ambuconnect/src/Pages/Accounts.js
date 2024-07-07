import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; 

const Accounts = () => {
  const { userName } = useUser(); // Access user state using the useUser hook
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on user type
    if (userName === "Hospital") {
      navigate("/hospitaldas");
    } else if (userName === "Ambulance") {
      navigate("/ambudas");
    }
  }, [userName, navigate]); // Trigger the effect whenever userName or navigate changes

  if (userName === null) {
    return <div>Loading... may be error</div>;
  }

  // Since navigation is triggered in the useEffect, you don't need to return anything here
  return null;
};

export default memo(Accounts);
