import { instance } from "./base";

export const signin = (email: string, password: string) => {
  return instance.post("/auth/signin", { email, password });
};

export const signup = (email: string, password: string) => {
  return instance.post("/auth/signup", { email, password });
};
