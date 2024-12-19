import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Eventos from './components/Eventos';
import React, { useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Registro from './components/Registro';
import Perfil from './components/Perfil';
import RequireAuth from './components/RequireAuth';
import Cookies from 'js-cookie';
import Calendario from './components/Calendario';
import Footer from './components/Footer'; // Importa el Footer
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [eventos, setEventos] = useState([]); // Estado global para eventos

  // Cargar autenticación y eventos
  useEffect(() => {
    const user = Cookies.get('user');
    setIsAuthenticated(!!user);

    const eventosGuardados = Cookies.get('eventos');
    try {
      const parsedEventos = eventosGuardados ? JSON.parse(eventosGuardados) : [];
      setEventos(parsedEventos);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      setEventos([]);
    }
  }, []);

  const abrirMenu = () => {
    let menuDesplegable = document.getElementById('menu');
    let botonCerrar = document.getElementById('botonMenu');
    menuDesplegable.classList.toggle('abrirMenu');
    botonCerrar.classList.toggle('cerrarMenu');
  };

  return (
    <Router>
      <div className="page-container">
        <header>
          <div id="boton1">
            <button onClick={abrirMenu} className="botonMenu" id="botonesMenu"> </button>
          </div>
          <nav id="menu" className="menuDesplegable">
            <ul className="menuLeft">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/eventos">Eventos</Link></li>
              <li><Link to="/calendario">Calendario</Link></li>
            </ul>

            <ul className="menuRight">
              <li>
                <Link to={isAuthenticated ? "/perfil" : "/login"}>
                  Perfil
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          {/* Pasa los eventos como prop a HomePage */}
          <Route path="/" element={<HomePage eventos={eventos} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route
            path="/eventos"
            element={
              <RequireAuth>
                <Eventos />
              </RequireAuth>
            }
          />
          <Route
            path="/perfil"
            element={
              <RequireAuth>
                <Perfil />
              </RequireAuth>
            }
          />
          <Route
            path="/calendario"
            element={
              <RequireAuth>
                <Calendario />
              </RequireAuth>
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
