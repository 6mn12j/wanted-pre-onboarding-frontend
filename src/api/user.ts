import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {},
});

export const signin = (email: string, password: string) => {
  return instance.post("/auth/signin", { email, password });
};

export const signup = (email: string, password: string) => {
  return instance.post("/auth/signup", { email, password });
};
