import axiosClient from "./axiosClient";

export const register = async (email, password) => {
  return axiosClient.post("/auth/register", {
    email,
    password,
  });
};

export const login = async (email, password) => {
  return axiosClient.post("/auth/login", {
    email,
    password,
  });
};