import axios from "axios";

const production = true;

const axiosInstance = axios.create({
  baseURL: production ? "https://stock-management-server-seven.vercel.app/api/" : "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
