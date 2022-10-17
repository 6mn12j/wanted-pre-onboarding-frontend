import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {},
});
