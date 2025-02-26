// infrastructure/api/axiosClient.ts
import axios from "axios";
import Config from "../../config";

const { DB_API } = Config;

export const axiosClient = axios.create({
    baseURL: DB_API,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para manejar tokens
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});