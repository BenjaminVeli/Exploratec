import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";

import UserImg from '../assets/img/UserImg.png';
import MinusCircle from "../assets/svg/minus-circle.svg"

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Credentials = () => {
  const [userData, setUserData] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
        setErrorMessage("Por favor completa todos los campos.");
        return;
    }

    if (newPassword !== confirmPassword) {
        setErrorMessage("Las contraseñas no coinciden.");
        return;
    }

    try {
        await api.patch("/api/change-password/", {
            current_password: currentPassword,
            new_password: newPassword,
        });
        
        toast.success("Contraseña actualizada correctamente!", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        setTimeout(() => {
          navigate("/form");
        }, 2500);

        setNewPassword("");
        setConfirmPassword("");  
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                setErrorMessage("La contraseña actual es incorrecta.");
            } else {
                setErrorMessage("Ocurrió un error. Inténtalo de nuevo más tarde.");
            }
        } else {
            setErrorMessage("Ocurrió un error. Inténtalo de nuevo más tarde.");
        }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    api
      .get("/api/current-user/")
      .then((res) => res.data)
      .then((data) => {
        setUserData(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  }

  return (
    <div>
      <Header />
      <section id="credentials" className="min-h-screen flex bg-slate-100 dark:bg-neutral-900">
          <div className="container flex justify-center items-center">
            <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center pb-1 pt-5">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={UserImg} alt="UserImg" />
                <h3 className="mb-1 text-xl font-bold text-blue-800 dark:text-white">{userData.username}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</span>
              </div>
              <div className="flex flex-col items-center pt-1 pb-5">
                <div className="input-box py-6">
                  <div className="input-field text-gray-950 dark:text-white" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}>
                        <input type="password"  className="input" required/>
                        <label>Contraseña actual</label>
                  </div>
                  <div className="input-field text-gray-950 dark:text-white" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}>
                        <input type="password"  className="input" required/>
                        <label>Contraseña nueva</label>
                  </div>
                  <div className="input-field text-gray-950 dark:text-white"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                        <input type="password"  className="input" required/>
                        <label>Repetir Contraseña nueva</label>
                  </div>
                  <div className="input-field ">
                          <button className="submit" type="submit" onClick={handleChangePassword}>Guardar</button>
                  </div>
                  {errorMessage &&
                    <div className="message-error-layout flex items-center mt-4">
                        <img src={MinusCircle} alt="MinusCircle" />
                        <strong className="text-sm pl-2">{errorMessage}</strong>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
    </div>
  )
}

export default Credentials