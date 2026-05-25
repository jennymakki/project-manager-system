import axiosClient from "./axiosClient";

export async function login(data) {
  const response = await axiosClient.post("/auth/login", data);
  return response.data;
}

export async function register(data) {
  const response = await axiosClient.post("/auth/register", data);
  return response.data;
}