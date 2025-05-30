import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5612/api/",
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
