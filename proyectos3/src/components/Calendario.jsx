import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Cookies from 'js-cookie';
import '../styles/Calendario.css';

const Calendario = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [eventosCalendario, setEventosCalendario] = useState([]);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const calendarioGuardado = Cookies.get('calendario');
    const tareasGuardadas = Cookies.get('tareas');
    setEventosCalendario(calendarioGuardado ? JSON.parse(calendarioGuardado) : []);
    setTareas(tareasGuardadas ? JSON.parse(tareasGuardadas) : []);
  }, []);

  const guardarTareasEnCookies = (nuevasTareas) => {
    Cookies.set('tareas', JSON.stringify(nuevasTareas), { expires: 7 });
  };

  const agregarTarea = (descripcion) => {
    const nuevaTarea = {
      id: Date.now(),
      descripcion,
      completada: false,
      fecha: fechaSeleccionada.toDateString(),
    };
    const nuevasTareas = [...tareas, nuevaTarea];
    setTareas(nuevasTareas);
    guardarTareasEnCookies(nuevasTareas);
  };

  const marcarTareaCompletada = (id) => {
    const nuevasTareas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(nuevasTareas);
    guardarTareasEnCookies(nuevasTareas);
  };

  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(nuevasTareas);
    guardarTareasEnCookies(nuevasTareas);
  };

  const tareasEnFecha = tareas.filter(
    (tarea) => new Date(tarea.fecha).toDateString() === fechaSeleccionada.toDateString()
  );

  const eventosEnFecha = eventosCalendario.filter((evento) => {
    return new Date(evento.fecha).toDateString() === fechaSeleccionada.toDateString();
  });

  const tieneEventos = (date) => {
    return eventosCalendario.some((evento) => new Date(evento.fecha).toDateString() === date.toDateString());
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && tieneEventos(date)) {
      return 'highlight-event-day';
    }
    return null;
  };

  return (
    <div className="calendario-container">
      <div className="calendario">
        <Calendar
          onChange={setFechaSeleccionada}
          value={fechaSeleccionada}
          tileClassName={tileClassName}
        />
      </div>

      <div className="detalles-container">
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

        <div className="tareas">
          <h3>Tareas para {fechaSeleccionada.toDateString()}</h3>
          <ul>
            {tareasEnFecha.length > 0 ? (
              tareasEnFecha.map((tarea) => (
                <li key={tarea.id} className={`tarea ${tarea.completada ? 'completada' : ''}`}>
                  <span>{tarea.descripcion}</span>
                  <div className="tarea-controles">
                    <button onClick={() => marcarTareaCompletada(tarea.id)}>
                      {tarea.completada ? 'Desmarcar' : 'Completar'}
                    </button>
                    <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                  </div>
                </li>
              ))
            ) : (
              <p>No hay tareas para esta fecha.</p>
            )}
          </ul>
          <div className="agregar-tarea">
            <input
              type="text"
              placeholder="Nueva tarea"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  agregarTarea(e.target.value.trim());
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendario;

