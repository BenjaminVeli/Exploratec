import useMenuToggle from '../hooks/useMenuToggle';
import { Link } from 'react-router-dom';
import ExploratecImg from '../assets/img/ExploraTec.png';

const  Header = () => {
  const { toggleRef, controlPanelRef } = useMenuToggle();

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
                <Link to="/" className="enlace menu enlacesnavi">Inicio</Link>
                <Link to="/login" className="enlace menu enlacesnavi">Iniciar sesión</Link>
                <Link to="/register" className="enlace menu enlacesnavi">Regístrate</Link>

                {/* Usuario autenticado */}
                {/* <Link to="/request" className="enlace menu enlacesnavi">Solicitud</Link>
                <Link to="/form" className="enlace menu enlacesnavi">Formulario</Link>
                <Link to="/logout" className="enlace menu enlacesnavi">Cerrar sesión</Link> */}

                {/* Administrador autenticado */}
                {/* <Link to="/admin-requests-list" className="enlace menu enlacesnavi">Solicitudes</Link>
                <Link to="/admin-users-list" className="enlace menu enlacesnavi">Usuarios</Link> */}


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
                <Link to="/" className="menu menupanel enlace enlacesnavi">Inicio</Link>
                <Link to="/login" className="menu menupanel enlace enlacesnavi">Iniciar sesión</Link>
                <Link to="/register" className="menu menupanel enlace enlacesnavi">Regístrate</Link>

                {/* Usuario autenticado */}
                <Link to="/request" className="menu menupanel enlace enlacesnavi">Solicitud</Link>
                <Link to="/form" className="menu menupanel enlace enlacesnavi">Formulario</Link>
                <Link to="/logout" className="menu menupanel enlace enlacesnavi">Cerrar sesión</Link>
                
                {/* Administrador autenticado */}
                <Link to="/admin-requests-list" className="enlace menu enlacesnavi">Solicitudes</Link>
                <Link to="/admin-users-list" className="enlace menu enlacesnavi">Usuarios</Link>

              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
