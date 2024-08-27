import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

import Header from "../components/Header";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/api/token/", { username, password });
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/form");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <Header />
            <div className="container main">
                <form className="row" onSubmit={handleSubmit}>
                    <div className="col-md-6 side-image--login">
                    <div className="text">
                        <p>EXPLORATEC</p>
                    </div>
                    </div>

                    <div className="col-md-6 right">
                    <div className="input-box">
                        <h2>Iniciar sesión</h2>
                        <div className="input-field">
                        <input type="text" className="input" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <label>Correo</label>
                        </div>
                        <div className="input-field">
                        <input type="password" className="input" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label>Contraseña</label>
                        </div>
                        <div className="input-field">
                        <button className="submit" type="submit">Ingresar</button>
                        </div>
                        <div className="signin">
                        <span>No tienes una cuenta?<a href="register">Regístrate</a></span>
                        </div>
                    </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default Login;