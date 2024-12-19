import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';
import '../styles/Noticias.css'; // Añadimos los estilos para las noticias
import noticias from '../components/Noticias.json'; // Importamos el JSON de noticias

const HomePage = ({ eventos }) => {
    const [eventosPopulares, setEventosPopulares] = useState([]);

    useEffect(() => {
        // Ordenar eventos por número de inscritos (popularidad)
        const populares = [...eventos].sort(
            (a, b) => (b.inscritos?.length || 0) - (a.inscritos?.length || 0)
        );
        setEventosPopulares(populares.slice(0, 5)); // Mostrar solo los 5 eventos más populares
    }, [eventos]);

    return (
        <div className="home-container">
            {/* Caja de eventos populares */}
            <div className="eventos-populares">
                <h3>Eventos Populares</h3>
                <ul>
                    {eventosPopulares.length > 0 ? (
                        eventosPopulares.map((evento) => (
                            <li key={evento.id} className="evento-item">
                                <strong>{evento.titulo}</strong> - {evento.inscritos?.length || 0} participantes
                            </li>
                        ))
                    ) : (
                        <p>No hay eventos disponibles.</p>
                    )}
                </ul>
            </div>

            {/* Caja principal centrada */}
            <div className="descripcion">
                <div className="caja-descripcion">
                    <h1>¡Bienvenidos a SportWave!</h1>
                    <p>
                        Somos un grupo de estudiantes apasionados por el deporte que decidimos
                        crear esta página con un único objetivo: unir a amantes del deporte. Queremos
                        facilitar que encuentres personas con quienes compartir actividades deportivas,
                        ya sea para entrenar, competir, o simplemente disfrutar de tu disciplina favorita.
                        ¡Únete a nuestra comunidad y haz del deporte una experiencia compartida!
                    </p>
                </div>
            </div>

            {/* Sección de noticias */}
            <div className="noticias">
                <h3>Últimas Noticias Deportivas</h3>
                <div className="noticias-grid">
                    {noticias.map((noticia, index) => (
                        <div key={index} className="noticia-card">
                            <img src={noticia.imagen} alt={noticia.titulo} className="noticia-imagen" />
                            <h4>{noticia.titulo}</h4>
                            <p>{noticia.resumen}</p>
                            <a href={noticia.url} target="_blank" rel="noopener noreferrer">
                                Leer más
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
