import axios from "axios";

const token = localStorage.getItem("token");
const baseUrl = import.meta.env.VITE_BASE_URL;

const params = {
  headers: {
    Authorization: `Bearer ${token}`, //Api key in auth header
    "Content-Type": "application/json", //Adjust type
  },
};

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(`${baseUrl}${url}`);
    return data;
  } catch (error) {
    console.error("Error in fetchDataFromApi:", error.message); // Log the error for debugging
    throw error; // Re-throw the error so it can be handled by the caller
  }
};

export const uploadImage = async (url, formData) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, formData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Upload failed", error.response?.data || error.message);
    throw error;
  }
};

export const deleteData = async (url) => {
  const { res } = await axios.delete(`${baseUrl}${url}`, params);
  return res;
};

export const deleteImages = async (url, image) => {
  const { res } = await axios.delete(`${baseUrl}${url}`, image);
  return res;
};

// dotenv.config();

// const BASE_URL = process.env.REACT_APP_BASE_URL || "";
