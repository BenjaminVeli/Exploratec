import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

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
      const requestUrl = error.config.url;

      // Verificar si la URL no es la de login y si ya hemos redirigido anteriormente
      if (requestUrl !== "/api/token/") {
        // Si ya se redirigió una vez, evitamos más redirecciones
        if (!window.redirected) {
          window.redirected = true;
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);

          // Verificar si es administrador
          const currentUser = JSON.parse(localStorage.getItem("current_user"));
          if (currentUser && currentUser.is_staff) {
            alert("La sesión de administrador ha expirado. Serás redirigido al inicio de sesión de administrador.");
            window.location.href = "/authentication-admin"; // Redirige a login de admin
          } else {
            alert("La sesión ha expirado. Serás redirigido al inicio de sesión.");
            window.location.href = "/login"; // Redirige a login de usuario normal
          }
        }
        return new Promise(() => {}); // Detener ejecución adicional
      }
    }

    return Promise.reject(error);
  }
);


export default api;
