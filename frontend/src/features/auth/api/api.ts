import axiosClient from "../../../lib/api/axiosClient.js"

export const register = (email: string, password: string) =>
  axiosClient.post("/auth/register", { email, password });

export const login = (email: string, password: string) =>
  axiosClient.post("/auth/login", { email, password });