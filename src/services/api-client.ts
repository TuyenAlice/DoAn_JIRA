import axios from "axios";
import { API_BASE_URL, TOKEN } from '../consts/common-consts';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'TokenCybersoft': TOKEN
    }
})

apiClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

export default apiClient;