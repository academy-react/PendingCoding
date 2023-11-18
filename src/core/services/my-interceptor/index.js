import axios from "axios";
import { getItem, removeItem } from "../common/storage.services";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

const onSeccsus = (response) => {
  return response.data;
};

const onError = (err) => {
  console.log(err);

  if (err.response.status === 401) {
    removeItem("tokens");
    window.Location.pathname = "/";
  }

  if (err.response.status >= 400 && err.response.status < 500) {
    alert("client error" + err.response.status);
  }

  return Promise.reject(err);
};

instance.interceptors.response.use(onSeccsus, onError);

instance.interceptors.request.use((opt) => {
  const token = getItem("token");
  opt.headers.Authorization = "Bearer " + token;
  return opt;
});

export default instance;