import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Eventos from './components/Eventos';
import React from 'react';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Registro from './components/Registro';
import './App.css';

/*let vacio = '';*/

function App() {
  const abrirMenu = ()=>{
    let menuDesplegable = document.getElementById('menu');
    let botonCerrar = document.getElementById('botonMenu');
    menuDesplegable.classList.toggle('abrirMenu');
    botonCerrar.classList.toggle('cerrarMenu');
  }

  return (
    <Router>
      <header>
        <div id='boton1'>
          <button onClick={abrirMenu} className='botonMenu' id='botonesMenu'> </button>
        </div>
        <nav id='menu' className='menuDesplegable'>
          <ul className="menuLeft">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
            <li><Link to="/calendario">Calendario</Link></li>
          </ul>

          <ul className="menuRight">
            <li><Link to="/login">Inicio Sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
      </Routes>
    </Router>
  );
}
export default App;
