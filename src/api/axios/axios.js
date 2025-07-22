import axios from "axios"

export const baseURL = "https://wtsacademy.dedicateddevelopers.us/api";

export const AxiosInstance = axios.create({
  baseURL
});

AxiosInstance.interceptors.request.use(
  async function (config) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token !== null || token !== undefined) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);


export const image = (media) => {
  return `https://wtsacademy.dedicateddevelopers.us` + `/uploads/product/${media}`;
}
  
  
//   Loading...
// https://wtsacademy.dedicateddevelopers.us
export const profile_pic = (media) => {
  return `https://wtsacademy.dedicateddevelopers.us` + `/uploads/user/profile_pic/${media}`;
}

export default AxiosInstance;