import axios from "axios";
import { toast } from "sonner";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error?.config?.silent) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
    return Promise.reject(error);
  }
);

export default API;
