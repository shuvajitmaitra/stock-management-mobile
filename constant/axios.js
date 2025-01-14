import axios from "axios";

const production = true;

const axiosInstance = axios.create({
  baseURL: production ? "https://stock-management-server-khaki.vercel.app" : "http://localhost:5001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
