import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api"; // Assuming your API endpoint
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect, useRef } from "react";

function ProtectedRoute({ children, adminRoute = false }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const userRef = useRef(null);

  useEffect(() => {
    auth();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      if (adminRoute && !userRef.current) {
        try {
          const userResponse = await api.get('/api/current-user/');
          userRef.current = userResponse.data;
          setIsAuthorized(userRef.current.is_staff);
        } catch (error) {
            console.log(error);
        }
      } else {
        setIsAuthorized(adminRoute ? userRef.current?.is_staff : true);
      }
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return adminRoute ? <Navigate to="/authentication-admin" /> : <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;