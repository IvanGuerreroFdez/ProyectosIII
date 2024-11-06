// Registro.jsx
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/Registro.css';

const Registro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [interests, setInterests] = useState({
    futbol: false,
    baloncesto: false,
    tenis: false,
    otros: false,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      password,  
      city,
      interests,
    };

    const users = Cookies.get('users') ? JSON.parse(Cookies.get('users')) : [];
    users.push(newUser);
    Cookies.set('users', JSON.stringify(users), { expires: 7 });

    setSuccessMessage('Registro exitoso. Redirigiendo a inicio de sesión...');
    setTimeout(() => navigate('/login'), 2000);
  };

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setInterests({ ...interests, [name]: checked });
  };

  return (
    <div className="registro-container">
      <h2>Registro</h2>
      <form onSubmit={handleRegister} className="registro-form">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <h4>Intereses</h4>
        <div className="interests">
          <label>
            <input
              type="checkbox"
              name="futbol"
              checked={interests.futbol}
              onChange={handleInterestChange}
            />
            Fútbol
          </label>
          <label>
            <input
              type="checkbox"
              name="baloncesto"
              checked={interests.baloncesto}
              onChange={handleInterestChange}
            />
            Baloncesto
          </label>
          <label>
            <input
              type="checkbox"
              name="tenis"
              checked={interests.tenis}
              onChange={handleInterestChange}
            />
            Tenis
          </label>
          <label>
            <input
              type="checkbox"
              name="otros"
              checked={interests.otros}
              onChange={handleInterestChange}
            />
            Otros
          </label>
        </div>

        <button type="submit">Registrarse</button>
        {successMessage && <p className="registro-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Registro;
