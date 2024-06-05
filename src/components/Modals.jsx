import React, { useState } from "react";
import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Button,
  Box
} from "@chakra-ui/react";

import { isValidLatitude, isValidLongitude } from "../utils/validateUtils";

const initialFormData = {
    markerName: "",
    latitude: null,
    longitude: null,
    color: "red",
  }
export const Modals = ({ isOpen, onClose, newMarkerAddedRenderHandler }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    markerName: "",
    latitude: null,
    longitude: null,
    color: "red",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(name === 'latitude') {
        if(!isValidLatitude(value)) {
            setErrorMessage("Invalid latitude.");
        }
        else {
            setErrorMessage("");
        }
    }
    if(name === 'longitude') {
        if(!isValidLongitude(value)) {
            setErrorMessage("Invalid longitude.");
        }
        else {
            setErrorMessage("");
        }
    }
    if(!value){
        setErrorMessage("Field cannot be empty.");
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { markerName, latitude, longitude, color } = formData;

    if (markerName && latitude && longitude && color) {
        let markersArray;
        if (!localStorage.getItem('markers')) {
            markersArray = [formData];
        } else {
            const localStorageData = localStorage.getItem('markers');
            markersArray = JSON.parse(localStorageData);
            markersArray.push(formData);
        }

        localStorage.setItem('markers', JSON.stringify(markersArray));

        newMarkerAddedRenderHandler();
        onClose();
    } else {
        alert('Please Provide Needed Information');
    }

    setFormData(initialFormData);
    setErrorMessage("");
  };
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Marker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="markerName"
                placeholder="Enter marker name"
                className="form-data"
                onChange={handleInputChange}
              />
              <Input
                type="number"
                name="latitude"
                className="form-data"
                placeholder="Enter latitude"
                onChange={handleInputChange}
              />
              <Input
                type="number"
                name="longitude"
                className="form-data"
                placeholder="Enter longitude"
                onChange={handleInputChange}
              />
              <Select
                placeholder="Select marker color"
                name= "color"
                className="form-data"
                value = {formData.color}
                style={{ cursor: "pointer" }}
                onChange={handleInputChange}
              >
                <option value = "red" style={{ color: 'red' }}>Red</option>
                <option value = "blue" style={{ color: 'blue' }}>Blue</option>
                <option value = "green" style={{ color: 'green' }}>Green</option>
              </Select>
              {errorMessage && (
                <Box color="red.500" ml="5px"> *{errorMessage}</Box>
              )}
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={onClose} type="submit">
                  Add
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
