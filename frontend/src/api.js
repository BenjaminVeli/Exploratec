import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Eliminar el token del localStorage para cerrar la sesión
      localStorage.removeItem(ACCESS_TOKEN);
      
      // Mostramos una única alerta y redirigimos al login
      alert("La sesión ha expirado. Serás redirigido al inicio de sesión.");
      
      // Redirigir manualmente al login
      window.location.href = "/login";
      
      // Retornamos una promesa rechazada para detener cualquier otra ejecución
      return new Promise(() => {});
    }
    return Promise.reject(error);
  }
);



export default api;
