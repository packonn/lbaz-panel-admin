import axios from "axios";
import { api } from "./constant";

export const getAllSpectacle = async () => {
  // Récupération de tous les événements
  try {
    const response = await axios.get(`${api}spectacles`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getOneSpectacle = async (id) => {
  // Récupération d'un événement
  try {
    const response = await axios.get(`${api}spectacle/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const postSpectacle = async (formData) => {
  // Publication d'un événement lié à un spectacle
  try {
    const response = await axios.post(
      `${api}spectacle/publication`,
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
export const udpateSpectacle = async (id, formData) => {
  // Modification d'un événement lié à un spectacle
  try {
    const response = await axios.post(
      `${api}spectacle/update/${id}`,
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

export const deleteMusicOrImageOneToOne = async (id, formData) => {
  // Suppression d'un événement lié à un spectacle
  try {
    const response = await axios.delete(
      `${api}spectacle/delete/element/${id}`,
      formData
      //   {
      //     headers: {
      //       Authorization: "Bearer " + userToken,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
export const deleteTotallySpectacle = async (id) => {
  // Suppression d'un événement lié à un spectacle
  try {
    const response = await axios.delete(
      `${api}spectacle/delete/spectacle/${id}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
