import axios from "axios";
import { API_BASE_URL, TOKEN } from "../consts/common-consts";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    TokenCybersoft: TOKEN,
  },
});

apiClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});

export default apiClient;
