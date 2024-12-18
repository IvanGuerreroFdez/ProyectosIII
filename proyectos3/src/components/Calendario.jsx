import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Cookies from 'js-cookie';
import '../styles/Calendario.css';

const Calendario = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [eventosCalendario, setEventosCalendario] = useState([]);

  useEffect(() => {
    const calendarioGuardado = Cookies.get('calendario');
    setEventosCalendario(calendarioGuardado ? JSON.parse(calendarioGuardado) : []);
  }, []);

  const eventosEnFecha = eventosCalendario.filter((evento) => {
    return new Date(evento.fecha).toDateString() === fechaSeleccionada.toDateString();
  });

  return (
    <div className="calendario-container">
    {/* Calendario a la izquierda */}
    <div className="calendario">
      <Calendar
        onChange={setFechaSeleccionada}
        value={fechaSeleccionada}
      />
    </div>

    {/* Contenido de eventos a la derecha */}
    <div className="eventos-en-fecha">
      <h3>Eventos en {fechaSeleccionada.toDateString()}</h3>
      {eventosEnFecha.length > 0 ? (
        eventosEnFecha.map((evento) => (
          <div key={evento.id} className="evento-card">
            <h4>{evento.titulo}</h4>
            <p><strong>Ubicación:</strong> {evento.ubicacion}</p>
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
