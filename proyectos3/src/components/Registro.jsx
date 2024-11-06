// Registro.js
import React, { useState } from 'react';
import '../styles/Registro.css';

const Registro = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    email: '',
    city: '',
    interests: {
      futbol: false,
      baloncesto: false,
      tenis: false,
      otros: false,
    },
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setUserDetails({
        ...userDetails,
        interests: {
          ...userDetails.interests,
          [name]: checked,
        },
      });
    } else {
      setUserDetails({
        ...userDetails,
        [name]: value,
      });
    }
  };

  const handleRegister = () => {
    const { username, password, email, city, interests } = userDetails;

    // Convertimos los intereses seleccionados en una lista de texto
    const selectedInterests = Object.keys(interests)
      .filter((key) => interests[key])
      .join(', ');

    // Creamos un mensaje con los datos del formulario
    const registrationMessage = `
      Nombre de usuario: ${username}
      Contraseña: ${password}
      Correo: ${email}
      Ciudad: ${city}
      Intereses: ${selectedInterests || 'Ninguno'}
    `;

    setMessage(registrationMessage);
  };

  return (
    <div className="registro-container">
      <h2>Registro de Usuario</h2>
      
      <div className="registro-form">
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={userDetails.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={userDetails.password}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={userDetails.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={userDetails.city}
          onChange={handleChange}
        />

        {/* Título para los intereses */}
        <h4>Intereses:</h4>
        <div className="interests">
          <label>
            <input
              type="checkbox"
              name="futbol"
              checked={userDetails.interests.futbol}
              onChange={handleChange}
            />
            Futbol
          </label>
          <label>
            <input
              type="checkbox"
              name="baloncesto"
              checked={userDetails.interests.baloncesto}
              onChange={handleChange}
            />
            Baloncesto
          </label>
          <label>
            <input
              type="checkbox"
              name="tenis"
              checked={userDetails.interests.tenis}
              onChange={handleChange}
            />
            Tenis
          </label>
          <label>
            <input
              type="checkbox"
              name="otros"
              checked={userDetails.interests.otros}
              onChange={handleChange}
            />
            Otros
          </label>
        </div>

        <button onClick={handleRegister}>Registrarse</button>

        {message && (
          <div className="registro-message">
            <h3>Datos de Registro</h3>
            <pre>{message}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registro;
