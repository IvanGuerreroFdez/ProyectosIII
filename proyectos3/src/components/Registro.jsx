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
  const [errorMessages, setErrorMessages] = useState({}); // Nuevo estado para manejar los errores
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Resetear mensajes de error
    setErrorMessages({});

    // Verificamos si todos los campos están completos
    if (!username || !email || !password || !city) {
      setErrorMessages(prevState => ({
        ...prevState,
        general: 'Por favor, complete todos los campos.'
      }));
      return;
    }

    // Verificamos si el nombre de usuario ya existe
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

    // Si todo es válido, registramos al nuevo usuario
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
        {errorMessages.username && <p className="error-message">{errorMessages.username}</p>} {/* Mensaje de error para el nombre de usuario */}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errorMessages.email && <p className="error-message">{errorMessages.email}</p>} {/* Mensaje de error para el correo */}

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessages.password && <p className="error-message">{errorMessages.password}</p>} {/* Mensaje de error para la contraseña */}

        <input
          type="text"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        {errorMessages.city && <p className="error-message">{errorMessages.city}</p>} {/* Mensaje de error para la ciudad */}

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
        {errorMessages.general && <p className="error-message">{errorMessages.general}</p>} {/* Mensaje de error general */}
        {successMessage && <p className="registro-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Registro;
