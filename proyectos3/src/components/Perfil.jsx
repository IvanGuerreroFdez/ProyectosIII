import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/Perfil.css';

const Perfil = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [tempProfilePic, setTempProfilePic] = useState(null); // Imagen temporal

  useEffect(() => {
    // Obtener usuario de las cookies
    const userCookie = Cookies.get('user');
    console.log(userCookie)
    if (userCookie) {
      const user = JSON.parse(userCookie);
      setUserInfo(user);

      // Buscar foto de perfil asociada al usuario en localStorage
      const profilePicKey = `profilePic_${user.username || user.email}`;
      const savedProfilePic = localStorage.getItem(profilePicKey);
      console.log("Imagen cookies:", savedProfilePic)
      if (savedProfilePic) {
        setProfilePic(savedProfilePic);
      }
    } else {
      // Redirigir si no hay sesión
      navigate('/login');
    }
  }, [navigate]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('Imagen cargada:', reader.result);
        setTempProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No se seleccionó un archivo válido.');
    }
  };

  const handleSaveChanges = () => {
    if (tempProfilePic) {
      setProfilePic(tempProfilePic);

      // Guardar foto de perfil asociada al usuario en localStorage
      const profilePicKey = `profilePic_${userInfo.username || userInfo.email}`;
      localStorage.setItem(profilePicKey, tempProfilePic);

      console.log(`Foto guardada para el usuario ${userInfo.username || userInfo.email}`);
      setTempProfilePic(null);
      alert('¡Foto de perfil guardada con éxito!');
    } else {
      alert('Por favor, selecciona una imagen antes de guardar.');
    }
  };

  const handleLogout = () => {
    // Eliminar cookies  relacionados con el usuario
    Cookies.remove('user');
    navigate('/login');
  };

  return (
    <div className="perfil-container">
      <h2>Perfil de Usuario</h2>
      {tempProfilePic || profilePic ? (
        <img src={tempProfilePic || profilePic} alt="Foto de perfil" className="profile-pic" />
      ) : (
        <div className="profile-pic-placeholder">Sin foto de perfil</div>
      )}
      <input type="file" onChange={handleProfilePicChange} />

      <div className="user-info">
        <p><strong>Nombre de usuario:</strong> {userInfo.username}</p>
        <p><strong>Correo electrónico:</strong> {userInfo.email}</p>
        <p><strong>Ciudad:</strong> {userInfo.city}</p>
        <p><strong>Intereses:</strong></p>
        <ul>
          {userInfo.interests &&
            Object.keys(userInfo.interests).map((interest) =>
              userInfo.interests[interest] ? (
                <li key={interest}>
                  {interest.charAt(0).toUpperCase() + interest.slice(1)}
                </li>
              ) : null
            )}
        </ul>
      </div>

      <div className="button-container">
        <button onClick={handleSaveChanges} className="save-button">
          Guardar Cambios
        </button>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Perfil;
