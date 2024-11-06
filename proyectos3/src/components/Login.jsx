// Login.jsx
import React, { useState } from 'react';
import '../styles/Login.css';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = Cookies.get('users') ? JSON.parse(Cookies.get('users')) : [];
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
      navigate('/perfil'); 
    } else {
      setErrorMessage('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
        {errorMessage && <p className="login-message error">{errorMessage}</p>}
      </form>
      <p className="create-account">
        ¿No tienes una cuenta? <Link to="/register">¡Crea una nueva cuenta!</Link>
      </p>
    </div>
  );
};

export default Login;
