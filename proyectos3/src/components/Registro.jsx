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
  const [errorMessages, setErrorMessages] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const interestIcons = { futbol: '⚽', baloncesto: '🏀', tenis: '🎾', otros: '⛳' };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessages({});
    if (!username || !email || !password || !city) {
      setErrorMessages(prevState => ({
        ...prevState,
        general: 'Por favor, complete todos los campos.'
      }));
      return;
    }

    const users = Cookies.get('users') ? JSON.parse(Cookies.get('users')) : [];
    const existingUsername = users.find(user => user.username === username);
    const existingEmail = users.find(user => user.email === email);

    if (existingUsername) {
      setErrorMessages(prevState => ({
        ...prevState,
        username: 'El nombre de usuario ya está en uso. Por favor, elige otro.'
      }));
      return;
    }

    if (existingEmail) {
      setErrorMessages(prevState => ({
        ...prevState,
        email: 'Ya hay una cuenta registrada con este correo.'
      }));
      return;
    }

    const newUser = {
      username,
      email,
      password,
      city,
      interests,
    };

    users.push(newUser);
    Cookies.set('users', JSON.stringify(users), { expires: 7 });
    setSuccessMessage('Registro exitoso. Redirigiendo a inicio de sesión...');
    setTimeout(() => navigate('/login'), 2000);
  };

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setInterests((prevInterests) => ({
      ...prevInterests,
      [name]: checked,
    }));
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
        {errorMessages.username && <p className="error-message">{errorMessages.username}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errorMessages.email && <p className="error-message">{errorMessages.email}</p>}

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
          {Object.keys(interestIcons).map(interest => (
            <label key={interest} className={`interest ${interests[interest] ? 'selected' : ''}`}>
              <input
                type="checkbox"
                name={interest}
                checked={interests[interest]}
                onChange={handleInterestChange}
              />
              <span className="icon">{interestIcons[interest]}</span>
              <span className="text">{interest.charAt(0).toUpperCase() + interest.slice(1)}</span>
            </label>
          ))}
        </div>

        <button type="submit">Registrarse</button>
        {errorMessages.general && <p className="error-message">{errorMessages.general}</p>}
        {successMessage && <p className="registro-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Registro;