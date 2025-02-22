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
    return response.data;
  } catch (error) {
    console.error("Upload failed", error.response?.data || error.message);
    throw error;
  }
};

export const deleteData = async (url) => {
  const res = await axios.delete(`${baseUrl}${url}`, params);
  return res.data;
};

export const deleteImages = async (url, image) => {
  const res = await axios.delete(`${baseUrl}${url}`, image);
  return res.data;
};

export const postData = async (url, formData) => {
  try {
    const res = await axios.post(`${baseUrl}${url}`, formData);
    return res.data;
  } catch (error) {
    if (error.response) {
      return { error: true, msg: error.response.data.message };
    } else if (error.request) {
      console.error("No response received:", error.request);
      return { error: true, msg: "No response received from the server." };
    } else {
      console.error("Request setup error:", error.message);
      return { error: true, msg: "Error setting up the request." };
    }
  }
};
