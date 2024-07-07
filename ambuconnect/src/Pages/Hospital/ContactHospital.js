import React, { useState, useRef, useEffect } from "react";
import conf from "../../conf/conf";
import "../Style/ContactHospital.css";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import Navbar from "../../HomePage/Navbar";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const ContactHospital = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [destination, setDestination] = useState("");
  const destinationRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  const onLoadDestination = (autocomplete) => {
    destinationRef.current = autocomplete;
  };

  const onPlaceChangedDestination = () => {
    if (destinationRef.current !== null) {
      setDestination(destinationRef.current.getPlace().formatted_address);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const fetchDirections = () => {
    if (userLocation && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: userLocation,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      <Navbar />
      <LoadScript
        googleMapsApiKey="API Key"
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || { lat: 0, lng: 0 }}
          zoom={userLocation ? 12 : 1}
        >
          <div className="input_dest" style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
            <Autocomplete
              onLoad={onLoadDestination}
              onPlaceChanged={onPlaceChangedDestination}
            >
              <input type="text" placeholder="Enter destination" />
            </Autocomplete>
            <button onClick={fetchDirections}>Get Directions</button>
          </div>
          {directionsResponse && (
            <DirectionsRenderer
              options={{
                directions: directionsResponse,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default ContactHospital;
