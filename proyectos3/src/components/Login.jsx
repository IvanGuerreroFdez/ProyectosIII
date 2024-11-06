import React, { useState } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const { username, password } = userCredentials;
    
    if (username === 'admin' && password === 'admin') {
      setMessage('Login exitoso');
    } else {
      setMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      
      <div className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={userCredentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={userCredentials.password}
          onChange={handleChange}
        />
        <button onClick={handleLogin}>Iniciar Sesión</button>
        
        {/* Muestra el mensaje de éxito o error */}
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
