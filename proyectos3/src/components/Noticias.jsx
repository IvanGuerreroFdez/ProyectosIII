import React from "react";
import noticias from "../noticias.json"; // Importamos el JSON
import "../styles/Noticias.css"; // Importamos los estilos

const Noticias = () => {
  return (
    <div className="noticias">
      <h3>Últimas Noticias Deportivas</h3>
      <div className="noticias-grid">
        {noticias.map((noticia, index) => (
          <div key={index} className="noticia-card">
            <img
              src={require(`../${noticia.imagen}`)} // Importa dinámicamente la imagen
              alt={noticia.titulo}
              className="noticia-imagen"
            />
            <div className="noticia-content">
              <h4>{noticia.titulo}</h4>
              <a
                href={noticia.url}
                target="_blank"
                rel="noopener noreferrer"
                className="noticia-link"
              >
                Leer más
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Noticias;
