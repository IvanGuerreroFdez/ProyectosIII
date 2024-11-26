import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../styles/Eventos.css';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [nuevoEvento, setNuevoEvento] = useState({
    titulo: '',
    descripcion: '',
    ubicacion: '',
    fecha: '',
    maxParticipantes: '',
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState('');
  const [calendario, setCalendario] = useState([]);

  useEffect(() => {
    const eventosGuardados = Cookies.get('eventos');
    const calendarioGuardado = Cookies.get('calendario');
    try {
      const parsedEventos = eventosGuardados ? JSON.parse(eventosGuardados) : [];
      const eventosValidados = parsedEventos.map((evento) => ({
        ...evento,
        inscritos: Array.isArray(evento.inscritos) ? evento.inscritos : [],
      }));
      setEventos(eventosValidados);

      const parsedCalendario = calendarioGuardado ? JSON.parse(calendarioGuardado) : [];
      setCalendario(parsedCalendario);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      Cookies.remove('eventos');
      Cookies.remove('calendario');
      setEventos([]);
      setCalendario([]);
    }

    const user = Cookies.get('user');
    const parsedUser = user ? JSON.parse(user) : null;
    setUsuarioActual(parsedUser?.username || 'Anónimo');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento({ ...nuevoEvento, [name]: value });
  };

  const handleCrearEvento = () => {
    if (
      nuevoEvento.titulo.trim() &&
      nuevoEvento.descripcion.trim() &&
      nuevoEvento.ubicacion.trim() &&
      nuevoEvento.fecha &&
      nuevoEvento.maxParticipantes
    ) {
      const evento = {
        id: Date.now(),
        ...nuevoEvento,
        creador: usuarioActual,
        creadoEn: new Date().toISOString(),
        inscritos: [],
      };

      const nuevosEventos = [...eventos, evento];
      nuevosEventos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      setEventos(nuevosEventos);

      Cookies.set('eventos', JSON.stringify(nuevosEventos), { expires: 7 });

      setNuevoEvento({
        titulo: '',
        descripcion: '',
        ubicacion: '',
        fecha: '',
        maxParticipantes: '',
      });
      setMostrarFormulario(false);
    }
  };

  const handleEliminarEvento = (id) => {
    const nuevosEventos = eventos.filter((evento) => evento.id !== id);
    setEventos(nuevosEventos);

    Cookies.set('eventos', JSON.stringify(nuevosEventos), { expires: 7 });
  };

  const handleMarcarCompletado = (id) => {
    const nuevosEventos = eventos.filter((evento) => evento.id !== id);
    setEventos(nuevosEventos);

    Cookies.set('eventos', JSON.stringify(nuevosEventos), { expires: 7 });

    alert('Evento marcado como completado y eliminado de la lista.');
  };

  const handleUnirseEvento = (id) => {
    const nuevosEventos = eventos.map((evento) => {
      if (evento.id === id) {
        if (evento.inscritos.length >= parseInt(evento.maxParticipantes, 10)) {
          alert('Este evento ya alcanzó el máximo de participantes.');
          return evento;
        }
        if (evento.inscritos.includes(usuarioActual)) {
          alert('Ya estás inscrito en este evento.');
          return evento;
        }
        return { ...evento, inscritos: [...evento.inscritos, usuarioActual] };
      }
      return evento;
    });

    setEventos(nuevosEventos);
    Cookies.set('eventos', JSON.stringify(nuevosEventos), { expires: 7 });
  };

  const handleSalirEvento = (id) => {
    const nuevosEventos = eventos.map((evento) => {
      if (evento.id === id) {
        return { ...evento, inscritos: evento.inscritos.filter((user) => user !== usuarioActual) };
      }
      return evento;
    });

    setEventos(nuevosEventos);
    Cookies.set('eventos', JSON.stringify(nuevosEventos), { expires: 7 });

    // Eliminar el evento del calendario si estaba inscrito
    const nuevosCalendario = calendario.filter((evento) => evento.id !== id);
    setCalendario(nuevosCalendario);
    Cookies.set('calendario', JSON.stringify(nuevosCalendario), { expires: 7 });

    alert('Te has salido del evento y se ha eliminado del calendario.');
  };

  const handleAgregarAlCalendario = (evento) => {
    const yaEnCalendario = calendario.some((ev) => ev.id === evento.id);
    if (yaEnCalendario) {
      alert('Este evento ya está en el calendario.');
      return;
    }

    const nuevoCalendario = [...calendario, evento];
    setCalendario(nuevoCalendario);

    Cookies.set('calendario', JSON.stringify(nuevoCalendario), { expires: 7 });
    alert(`Evento "${evento.titulo}" añadido al calendario.`);
  };

  return (
    <div className="eventos-container">
      <h2>Eventos</h2>

      <div className="lista-eventos">
        <h3>Lista de eventos creados</h3>
        {eventos.length > 0 ? (
          eventos.map((evento) => (
            <div key={evento.id} className="evento-card">
              {evento.creador === usuarioActual && (
                <div className="evento-controles">
                  <button
                    className="eliminar-evento"
                    onClick={() => handleEliminarEvento(evento.id)}
                    title="Eliminar este evento"
                  >
                    X
                  </button>
                  <button
                    className="completar-evento"
                    onClick={() => handleMarcarCompletado(evento.id)}
                    title="Marcar como completado"
                  >
                    ✔
                  </button>
                </div>
              )}
              <h4>{evento.titulo}</h4>
              <p>{evento.descripcion}</p>
              <p><strong>Ubicación:</strong> {evento.ubicacion}</p>
              <p><strong>Fecha:</strong> {new Date(evento.fecha).toLocaleDateString()}</p>
              <p><strong>Participantes:</strong> {evento.inscritos?.length || 0}/{evento.maxParticipantes}</p>
              <p><small>Creado por: {evento.creador}</small></p>
              <p><small>Creado el: {new Date(evento.creadoEn).toLocaleString()}</small></p>
              {evento.creador !== usuarioActual && (
                <div className="salir-unirse">
                  {evento.inscritos.includes(usuarioActual) ? (
                    <>
                      <button onClick={() => handleSalirEvento(evento.id)}>Salir del evento</button>
                      <button onClick={() => handleAgregarAlCalendario(evento)}>
                        Añadir al Calendario
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleUnirseEvento(evento.id)}>Unirse al evento</button>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No hay eventos creados aún.</p>
        )}
      </div>

      <div className="crear-evento">
        <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? 'Cerrar formulario' : 'Crear nuevo evento'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="crear-evento">
          <h3>Crea un nuevo evento</h3>
          <input
            type="text"
            name="titulo"
            placeholder="Título del evento"
            value={nuevoEvento.titulo}
            onChange={handleInputChange}
          />
          <textarea
            name="descripcion"
            placeholder="Descripción del evento"
            value={nuevoEvento.descripcion}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ubicacion"
            placeholder="Ubicación del evento"
            value={nuevoEvento.ubicacion}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="fecha"
            value={nuevoEvento.fecha}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="maxParticipantes"
            placeholder="Máximo de participantes"
            value={nuevoEvento.maxParticipantes}
            onChange={handleInputChange}
          />
          <button onClick={handleCrearEvento}>Crear Evento</button>
        </div>
      )}
    </div>
  );
};

export default Eventos;
