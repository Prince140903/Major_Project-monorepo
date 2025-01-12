import axios from "axios";

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get("http://localhost:4000" + url);

    console.log(data);

    return data.products;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const uploadImage = async (url, formData) => {
  console.log(url);
  const { res } = await axios.post(`${url}`, formData);
  return res;
};

export const deleteData = async (url) => {
  const { res } = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}${url}`,
    params
  );
  return res;
};

export const deleteImages = async (url, image) => {
  const { res } = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}${url}`,
    image
  );
  return res;
};

// dotenv.config();

// const token = localStorage.getItem("token");

// const params = {
//   headers: {
//     Authorization: `Bearer ${token}`, //Api key in auth header
//     "Content-Type": "application/json", //Adjust type
//   },
// };

// const BASE_URL = process.env.REACT_APP_BASE_URL || "";
