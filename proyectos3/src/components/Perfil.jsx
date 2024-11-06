// Perfil.jsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/Perfil.css';

const Perfil = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUserInfo(JSON.parse(userCookie));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    Cookies.remove('user');  
    navigate('/login');      
  };

  return (
    <div className="perfil-container">
      <h2>Perfil de Usuario</h2>
      {profilePic ? (
        <img src={profilePic} alt="Foto de perfil" className="profile-pic" />
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
              userInfo.interests[interest] ? <li key={interest}>{interest.charAt(0).toUpperCase() + interest.slice(1)}</li> : null
            )}
        </ul>
      </div>
      
      <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
    </div>
  );
};

export default Perfil;
