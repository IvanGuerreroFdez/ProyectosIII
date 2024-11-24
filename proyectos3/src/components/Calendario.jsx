import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Cookies from 'js-cookie';
import '../styles/Calendario.css';

const Calendario = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [eventosInscritos, setEventosInscritos] = useState([]);

  useEffect(() => {
    const inscritos = Cookies.get('eventosInscritos');
    setEventosInscritos(inscritos ? JSON.parse(inscritos) : []);
  }, []);

  const eventosEnFecha = eventosInscritos.filter((evento) => {
    // Simularemos que todos los eventos tienen fecha de hoy por defecto
    return new Date(evento.fecha || new Date()).toDateString() === fechaSeleccionada.toDateString();
  });

  return (
    <div className="calendario-container">
      <h2>Mi Calendario de Actividades</h2>
      <Calendar
        onChange={setFechaSeleccionada}
        value={fechaSeleccionada}
      />
      <div className="eventos-en-fecha">
        <h3>Eventos en {fechaSeleccionada.toDateString()}</h3>
        {eventosEnFecha.length > 0 ? (
          eventosEnFecha.map((evento) => (
            <div key={evento.id} className="evento-card">
              <h4>{evento.titulo}</h4>
              <p>{evento.descripcion}</p>
            </div>
          ))
        ) : (
          <p>No hay eventos en esta fecha.</p>
        )}
      </div>
    </div>
  );
};

export default Calendario;
