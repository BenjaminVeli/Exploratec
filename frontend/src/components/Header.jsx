import useMenuToggle from '../hooks/useMenuToggle';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ExploratecImg from '../assets/img/ExploraTec.png';
import { ACCESS_TOKEN } from "../constants";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const { toggleRef, controlPanelRef } = useMenuToggle();

  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('current_user'));
    return user && user.is_staff;
  }

  const isAuthenticated = !!accessToken;

  const toggleTheme = () => {
    const updatedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(updatedTheme);
    localStorage.setItem('theme', updatedTheme);
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <header className={`seccion header ${theme}`} id="header">
        <div className="navwrapper" id="navwrapper">
          <nav className="nav">
            <div className="logo__tecsup">
              <Link className="logo__tecsup_container" to="/">
                <div className="logo__text">
                  <img src={ExploratecImg} className="w-28" alt="logoExploraTec" />
                </div>
              </Link>
            </div>
            <div className="navigators">
              <div className="navigators__container">
                {!isAuthenticated && (
                  <>
                    <Link to="/" className="enlace menu enlacesnavi">Inicio</Link>
                    <Link to="/login" className="enlace menu enlacesnavi">Iniciar sesión</Link>
                    <Link to="/register" className="enlace menu enlacesnavi">Regístrate</Link>
                  </>
                )}
                {isAuthenticated && isAdmin() && (
                  <>
                    <Link to="/admin-kpis" className="enlace menu enlacesnavi">Reports</Link>
                    <Link to="/admin-requests-list" className="enlace menu enlacesnavi">Request List</Link>
                    <Link to="/admin-users-list" className="enlace menu enlacesnavi">User List</Link>
                    <Link to="/logout-admin" className="enlace menu enlacesnavi">Logout</Link>
                  </>
                )}
                {isAuthenticated && !isAdmin() && (
                  <>
                    <Link to="/request" className="enlace menu enlacesnavi">Solicitud</Link>
                    <Link to="/form" className="enlace menu enlacesnavi">Formulario</Link>
                    <Link to="/credentials" className="enlace menu enlacesnavi">Credenciales</Link>
                    <Link to="/logout" className="enlace menu enlacesnavi">Cerrar sesión</Link>
                  </>
                )}
                <div id="dark-btn" className={`dark-btn ${theme === 'dark' ? 'dark-btn-on' : ''}`} onClick={toggleTheme}>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="btn__menu" id="hamburguesa" ref={toggleRef}>
              <span className="carne"></span>
            </div>
          </nav>
        </div>
        <div className="panel_de_control" id="panelControl" ref={controlPanelRef}>
          <div className="panel_content">
            <div className="menu__section">
              <div className="menu_header">
                <h2 className="menu_titulo">Menú</h2>
                <div id="dark-btn" className={`dark-btn ${theme === 'dark' ? 'dark-btn-on' : ''}`} onClick={toggleTheme}>
                    <span></span>
                  </div>
              </div>
              <div className="panel__navegadores menu">
                {!isAuthenticated && (
                  <>
                    <Link to="/" className="menu menupanel enlace enlacesnavi">Inicio</Link>
                    <Link to="/login" className="menu menupanel enlace enlacesnavi">Iniciar sesión</Link>
                    <Link to="/register" className="menu menupanel enlace enlacesnavi">Regístrate</Link>
                  </>
                )}
                {isAuthenticated && isAdmin() && (
                  <>
                    <Link to="/admin-kpis" className="menu menupanel enlace enlacesnavi">Reports</Link>
                    <Link to="/admin-requests-list" className="menu menupanel enlace enlacesnavi">Request List</Link>
                    <Link to="/admin-users-list" className="menu menupanel enlace enlacesnavi">User List</Link>
                    <Link to="/logout-admin" className="menu menupanel enlace enlacesnavi">Logout</Link>
                  </>
                )}
                {isAuthenticated && !isAdmin() && (
                  <>
                    <Link to="/request" className="menu menupanel enlace enlacesnavi">Solicitud</Link>
                    <Link to="/form" className="menu menupanel enlace enlacesnavi">Formulario</Link>
                    <Link to="/credentials" className="menu menupanel enlace enlacesnavi">Credenciales</Link>
                    <Link to="/logout" className="menu menupanel enlace enlacesnavi">Cerrar sesión</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;