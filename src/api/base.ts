import axios from "axios";
import { getLocalStorage } from "utils";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {},
});

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${getLocalStorage("jwt")}`,
    };
    return config;
  },
  (error) => Promise.reject(error.response)
);
