import useMenuToggle from '../hooks/useMenuToggle';
import { Link } from 'react-router-dom';
import ExploratecImg from '../assets/img/ExploraTec.png';
import { ACCESS_TOKEN } from "../constants";

const  Header = () => {
  const { toggleRef, controlPanelRef } = useMenuToggle();

  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  // Función para verificar si el usuario es administrador
  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('current_user'));
    return user && user.is_staff;
  }

  const isAuthenticated = !!accessToken;

  return (
    <div>
      <header className="seccion header" id="header">
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

                {/* Usuario sin autenticación */}
                {!isAuthenticated && (
                  <>
                    <Link to="/" className="enlace menu enlacesnavi">Inicio</Link>
                    <Link to="/login" className="enlace menu enlacesnavi">Iniciar sesión</Link>
                    <Link to="/register" className="enlace menu enlacesnavi">Regístrate</Link>
                  </>
                )}

                {/* Menú para administrador autenticado */}
                {isAuthenticated && isAdmin() && (
                  <>
                    <Link to="/admin-requests-list" className="enlace menu enlacesnavi">Request List</Link>
                    <Link to="/admin-users-list" className="enlace menu enlacesnavi">User List</Link>
                    <Link to="/logout-admin" className="enlace menu enlacesnavi">Logout</Link>
                  </>
                )}

                {/* Menú para usuario autenticado */}
                {isAuthenticated && !isAdmin() && (
                  <>
                    <Link to="/request" className="enlace menu enlacesnavi">Solicitud</Link>
                    <Link to="/form" className="enlace menu enlacesnavi">Formulario</Link>
                    <Link to="/logout" className="enlace menu enlacesnavi">Cerrar sesión</Link>
                  </>
                )}

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
              <h1 className="menu_titulo">Menú</h1>
              <div className="panel__navegadores menu">

                {/* Usuario sin autenticación */}
                {!isAuthenticated && (
                  <>
                    <Link to="/" className="menu menupanel enlace enlacesnavi">Inicio</Link>
                    <Link to="/login" className="menu menupanel enlace enlacesnavi">Iniciar sesión</Link>
                    <Link to="/register" className="menu menupanel enlace enlacesnavi">Regístrate</Link>
                  </>
                )}

                {/* Administrador autenticado */}
                {isAuthenticated && isAdmin() && (
                  <>
                    <Link to="/admin-requests-list" className="menu menupanel enlace enlacesnavi">Request List</Link>
                    <Link to="/admin-users-list" className="menu menupanel enlace enlacesnavi">User List</Link>
                    <Link to="/logout-admin" className="menu menupanel enlace enlacesnavi">Logout</Link> 
                    </>
                )}

                {/* Usuario autenticado */}
                {isAuthenticated && !isAdmin() && (
                  <>
                    <Link to="/request" className="menu menupanel enlace enlacesnavi">Solicitud</Link>
                    <Link to="/form" className="menu menupanel enlace enlacesnavi">Formulario</Link>
                    <Link to="/logout" className="menu menupanel enlace enlacesnavi">Cerrar sesión</Link>                
                  </>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
