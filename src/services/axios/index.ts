import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const publicInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const privateInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

privateInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleResponseError = (error: any) => {
  if (error.response) {
    const { data } = error.response;
    return Promise.reject(data.error || data.message);
  }
  return Promise.reject(error.message);
};

publicInstance.interceptors.response.use((response) => response, handleResponseError);
privateInstance.interceptors.response.use((response) => response, handleResponseError);

export { publicInstance, privateInstance };

