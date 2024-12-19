import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="footer-link">
          ¿Quiénes somos?
        </Link>
        <span className="footer-copyright"> &copy; {new Date().getFullYear()} SportWave</span>
        <Link to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="footer-link">
          Contáctanos
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
