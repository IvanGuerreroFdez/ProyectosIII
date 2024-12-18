import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/Perfil.css';

const Perfil = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [tempProfilePic, setTempProfilePic] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Modo edición
  const [formData, setFormData] = useState({
    username: '',
    interests: { futbol: false, baloncesto: false, tenis: false, otros: false },
  });

  const interestIcons = {
    futbol: '⚽',
    baloncesto: '🏀',
    tenis: '🎾',
    otros: '⛳',
  };

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      const user = JSON.parse(userCookie);
      setUserInfo(user);
      setFormData({
        username: user.username,
        interests: user.interests || { futbol: false, baloncesto: false, tenis: false, otros: false },
      });
      const profilePicKey = `profilePic_${user.username || user.email}`;
      const savedProfilePic = localStorage.getItem(profilePicKey);
      if (savedProfilePic) setProfilePic(savedProfilePic);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setTempProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    const users = Cookies.get('users') ? JSON.parse(Cookies.get('users')) : [];

    // Actualizamos al usuario en la lista general de usuarios
    const updatedUsers = users.map((user) =>
      user.email === userInfo.email
        ? { ...user, username: formData.username, interests: formData.interests }
        : user
    );
    Cookies.set('users', JSON.stringify(updatedUsers), { expires: 7 });

    // Actualizamos la cookie de la sesión actual
    const updatedUser = {
      ...userInfo,
      username: formData.username,
      interests: formData.interests,
    };
    setUserInfo(updatedUser);
    Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 });

    // Guardamos la foto de perfil si se modificó
    if (tempProfilePic) {
      const profilePicKey = `profilePic_${userInfo.username || userInfo.email}`;
      localStorage.setItem(profilePicKey, tempProfilePic);
      setProfilePic(tempProfilePic);
      setTempProfilePic(null);
    }

    setIsEditing(false);
    alert('Cambios guardados con éxito.');
  };

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      interests: { ...prev.interests, [name]: checked },
    }));
  };

  const handleLogout = () => {
    Cookies.remove('user');
    navigate('/login');
  };

  return (
    <div className="perfil-container">
      <h2>Perfil de Usuario</h2>
      {tempProfilePic || profilePic ? (
        <img src={tempProfilePic || profilePic} alt="Foto de perfil" className="profile-pic" />
      ) : (
        <div className="profile-pic-placeholder">Sin foto</div>
      )}

      {isEditing && (
        <div className="custom-file-input">
          <label htmlFor="file-input">Modificar Foto</label>
          <input
            id="file-input"
            type="file"
            style={{ display: 'none' }}
            onChange={handleProfilePicChange}
          />
        </div>
      )}

      <div className="user-info">
        {isEditing ? (
          <>
            {/* Campo de nombre editable */}
            <label>
              <strong>Nombre:</strong>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </label>

            {/* Campo de correo solo lectura */}
            <label>
              <strong>Correo:</strong>
              <input
                type="text"
                value={userInfo.email || 'correo@ejemplo.com'} /* Valor por defecto si no hay correo */
                readOnly
              />
            </label>

            {/* Intereses */}
            <h4>Intereses</h4>
            <div className="interests">
              {Object.keys(interestIcons).map((interest) => (
                <label key={interest}>
                  <input
                    type="checkbox"
                    name={interest}
                    checked={formData.interests[interest]}
                    onChange={handleInterestChange}
                  />
                  {interestIcons[interest]} {interest.charAt(0).toUpperCase() + interest.slice(1)}
                </label>
              ))}
            </div>
          </>
        ) : (
          <>
            <p><strong>Nombre:</strong> {userInfo.username}</p>
            <p><strong>Correo:</strong> {userInfo.email}</p> {/* Mostrar correo al visualizar perfil */}
            <div className="interests">
              <ul>
                {Object.entries(userInfo.interests || {}).map(([key, value]) =>
                  value && <li key={key}>{interestIcons[key]} {key.charAt(0).toUpperCase() + key.slice(1)}</li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="button-container">
        {isEditing ? (
          <button onClick={handleSaveChanges} className="save-button">Guardar Cambios</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-button">Editar Perfil</button>
        )}
      </div>
      <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
    </div>
  );
};

export default Perfil;
