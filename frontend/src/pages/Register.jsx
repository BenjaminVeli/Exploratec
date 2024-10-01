import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import MinusCircle from "../assets/svg/minus-circle.svg"
import { registerSchema } from "../schemas/auth";

import Header from "../components/Header";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Register(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationResult = registerSchema.safeParse({ email, username, password });
        if (!validationResult.success) {
            setErrorMessage(validationResult.error.errors[0].message);
            return;
        }

        try {
            await api.post("/api/user/register/", { email, username, password });
            toast.success("¡Registro exitoso!", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        
              setTimeout(() => {
                navigate("/login");
              }, 2500);
        } catch (error) {
            if(error.response){
                if(error.response.status == 400){
                    setErrorMessage("El nombre de usuario ya esta en uso.");
                } else {
                    setErrorMessage("Ocurrió un error. Inténtalo de nuevo más tarde.")
                }
            }
        }
    };

    return (
        <div className="authentications">
            <Header />
            <div className="container main">
                <form className="row" onSubmit={handleSubmit}> 
                    <div className="col-md-6 side-image-register">
                    <div className="text">
                        <p className="uppercase">Exploratec</p>
                    </div>
                    </div>

                    <div className="col-md-6 right">
                    <div className="input-box">
                        <h2>Regístrate</h2>
                        <div className="input-field">
                        <input type="text" className="input" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <label>Usuario</label>
                        </div>
                        <div className="input-field">
                        <input type="email" className="input" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label>Correo</label>
                        </div>
                        <div className="input-field">
                        <input type="password" className="input" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label>Contraseña</label>
                        </div>
                        <div className="input-field">
                        <button className="submit" type="submit">Registrarse</button>
                        </div>
                        {errorMessage && 
                            <div className="message-error-layout flex items-center mt-4">
                                <img src={MinusCircle} alt="MinusCircle" />
                                <strong className="text-sm pl-2">{errorMessage}</strong>
                            </div>
                        }
                        <div className="signin">
                        <span>Ya tienes una cuenta?<Link to="/login">Inicia sesión</Link></span>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Register;