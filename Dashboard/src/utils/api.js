import axios from "axios";

const token = localStorage.getItem("token");

const params = {
  headers: {
    Authorization: `Bearer ${token}`, //Api key in auth header
    "Content-Type": "application/json", //Adjust type
  },
};

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_BASE_URL + url,
      params
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const uploadImage = async (url, formData) => {
  const { res } = await axios.post(
    process.env.REACT_APP_BASE_URL + url,
    formData
  );
  return res;
};
