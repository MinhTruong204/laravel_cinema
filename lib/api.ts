// app/lib/api.ts  (hoặc lib/api.ts)
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  withCredentials: true, // QUAN TRỌNG NHẤT – gửi cookie Sanctum
});

export const initCsrf = () => api.get("/sanctum/csrf-cookie");

export default api;
