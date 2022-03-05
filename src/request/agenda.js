import axios from "axios";
import { api } from "./constant";

export const getAllEvents = async () => {
  // Récupération de tous les événements
  try {
    const response = await axios.get(`${api}evenements`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getOneEvent = async (id) => {
  // Récupération d'un événement
  try {
    const response = await axios.get(`${api}evenement/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getAllEventsOfSpectacle = async (id) => {
  // Récupération de tous les événements d'un spectacle
  try {
    const response = await axios.get(`${api}evenement/filtre/spectacle/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const postEvent = async (formData, id) => {
  // Publication d'un événement lié à un spectacle
  try {
    const response = await axios.post(
      `${api}evenement/publication/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
export const updateEvent = async (id, formData) => {
  // Modification d'un événement lié à un spectacle
  try {
    const response = await axios.post(
      `${api}evenement/update/${id}`,
      formData
      //   {
      //     headers: {
      //       Authorization: "Bearer " + userToken,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const deleteEvent = async (id) => {
  // Suppression d'un événement lié à un spectacle
  try {
    const response = await axios.delete(`${api}evenement/delete/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
