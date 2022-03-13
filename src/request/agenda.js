import axios from "axios";
import { api } from "./constant";

export const getAllEvents = async () => {
  // Récupération de tous les événements
  try {
    const response = await axios.get(`${api}agenda`);
    return response;
  } catch (error) {
    return null;
  }
};
export const getOneEvent = async (id) => {
  // Récupération d'un événement
  try {
    const response = await axios.get(`${api}agenda/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getAllEventsOfSpectacle = async (id) => {
  // Récupération de tous les événements d'un spectacle
  try {
    const response = await axios.get(`${api}agenda/filtre/spectacle/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const postEvent = async (formData, id) => {
  // Publication d'un événement lié à un spectacle
  try {
    const response = await axios.post(
      `${api}agenda/publication/${id}`,
      formData
    );
    return response;
  } catch (error) {
    return null;
  }
};
export const updateEvent = async (formData, id) => {
  // Modification d'un événement lié à un spectacle
  try {
    const response = await axios.put(
      `${api}agenda/update/${id}`,
      formData
      //   {
      //     headers: {
      //       Authorization: "Bearer " + userToken,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
    );
    return response;
  } catch (error) {
    return null;
  }
};

export const deleteEvent = async (id) => {
  // Suppression d'un événement lié à un spectacle
  try {
    const response = await axios.delete(`${api}agenda/delete/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
