import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

import { loginSchema } from "../../schemas/auth";
import MinusCircle from "../../assets/svg/minus-circle.svg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminAuthentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = loginSchema.safeParse({ username, password });
    if (!validationResult.success) {
      setErrorMessage(validationResult.error.errors[0].message);
      return;
    }

    try {
      const res = await api.post("/api/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      toast.success("¡Inicio de sesión exitoso! Bienvenido.", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const userResponse = await api.get("/api/current-user/");
      const user = userResponse.data;

      if (user.is_staff) {
        setTimeout(() => {
          navigate("/admin-users-list");
        }, 2500);
      } else {
        setErrorMessage("El usuario no tiene permisos administrativos.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status == 401) {
          setErrorMessage("Usuario o contraseña son incorrectos.");
        } else {
          setErrorMessage("Ocurrió un error. Inténtalo de nuevo más tarde.");
        }
      }
    }
  };

  return (
    <div className="authentications">
      <div className="container main">
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-6 side-image-admin">
            <div className="text">
              <p className="uppercase">Exploratec</p>
            </div>
          </div>

          <div className="col-md-6 right">
            <div className="input-box">
              <h2>Iniciar sesión</h2>
              <div className="input-field">
                <input
                  type="text"
                  className="input"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Usuario</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="input"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Contraseña</label>
              </div>
              <div className="input-field">
                <button className="submit" type="submit">
                  Ingresar
                </button>
              </div>
              {errorMessage && (
                <div className="message-error-layout flex items-center mt-4">
                  <img src={MinusCircle} alt="MinusCircle" />
                  <strong className="text-sm pl-2">{errorMessage}</strong>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default AdminAuthentication;
