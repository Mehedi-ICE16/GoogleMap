import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import { Box } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Modals } from "../components/Modals";
export const MapWithMarker = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isNewMarkerAdded, setIsNewMarkerAdded] = useState(true);
  const [allMarkers, setAllMarkers] = useState([]);
  const API_KEY = "AIzaSyANM-S8csQhiY7y2RGmzCD1PDN0dIxFzlY";

  useEffect(() => {
    const allMarkersFromLocalStorage = JSON.parse(
      localStorage.getItem("markers")
    );
    setAllMarkers(allMarkersFromLocalStorage);
    console.log("new markers", allMarkersFromLocalStorage);
  }, [isNewMarkerAdded]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  
  const newMarkerAddedRenderHandler = () => {
    setIsNewMarkerAdded(!isNewMarkerAdded);
  };

  const colorUrlDictionary = {
    red: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    blue: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    green: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
  };
  return (
    <Box h="95dvh" w="95dvw"  overflow="hidden" position="relative">
      <APIProvider apiKey={API_KEY}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: 0, lng: 0 }}
          defaultZoom={2}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />

        {allMarkers?.map((marker) => (
          <Marker
            key={marker.markerName}
            position={{
              lat: Number(marker.latitude),
              lng: Number(marker.longitude),
            }}
            clickable={true}
            icon={{
              url: colorUrlDictionary[marker.color],
            }}
            onClick={() =>
              alert(
                `Marker named ${marker.markerName}'s Latitude is ${marker.latitude}° and Longitude is ${marker.longitude}°`
              )
            }
            title={marker.markerName}
          />
        ))}
      </APIProvider>
      <AddIcon
        onClick={openModal}
        boxSize={10}
        style={{
          cursor: "pointer",
          color: "#FFFFFF",
          backgroundColor: "red",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
        }}
      />
      <Modals
        newMarkerAddedRenderHandler={newMarkerAddedRenderHandler}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </Box>
  );
};
