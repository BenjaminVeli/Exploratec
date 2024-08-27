import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

import Header from "../components/Header";

function Register(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/api/user/register/", { email, username, password });
            navigate("/login");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <Header />
            <div className="container main">
                <form className="row" onSubmit={handleSubmit}> 
                    <div className="col-md-6 side-image--register">
                    <div className="text">
                        <p>EXPLORATEC</p>
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
                        <div className="signin">
                        <span>Ya tienes una cuenta?<Link to="/login">Inicia sesión</Link></span>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;