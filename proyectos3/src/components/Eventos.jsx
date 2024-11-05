import React, { useState, useEffect } from 'react';
import '../styles/Eventos.css';

const eventosIniciales = [
  { id: 1, titulo: "Carrera en el parque", descripcion: "Quedada para correr 5 km en el parque central", participantes: 3 },
  { id: 2, titulo: "Partido de padel", descripcion: "Busco 3 personas para jugar un partido de padel este sábado", participantes: 1 },
];

const Eventos = () => {
  const [eventos, setEventos] = useState(eventosIniciales);
  const [nuevoEvento, setNuevoEvento] = useState({ titulo: '', descripcion: '' });

  const handleChange = (e) => {
    setNuevoEvento({ ...nuevoEvento, [e.target.name]: e.target.value });
  };

  const crearEvento = () => {
    if (nuevoEvento.titulo && nuevoEvento.descripcion) {
      setEventos([...eventos, { id: eventos.length + 1, ...nuevoEvento, participantes: 1 }]);
      setNuevoEvento({ titulo: '', descripcion: '' });
    }
  };

  const unirseEvento = (id) => {
    setEventos(
        eventos.map((evento) =>
        evento.id === id ? { ...evento, participantes: evento.participantes + 1 } : evento
      )
    );
  };

  return (
    <div className="eventos-container">
      <h2>Eventos Deportivos</h2>

      <div className="eventos-feed">
        {eventos.map((evento) => (
          <div key={evento.id} className="evento-card">
            <h3>{evento.titulo}</h3>
            <p>{evento.descripcion}</p>
            <p>Participantes: {evento.participantes}</p>
            <button onClick={() => unirseEvento(evento.id)}>Unirse al evento</button>
          </div>
        ))}
      </div>

      <div className="crear-evento">
        <h3>Crear un nuevo evento</h3>
        <input
          type="text"
          name="titulo"
          placeholder="Título del evento"
          value={nuevoEvento.titulo}
          onChange={handleChange}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción del evento"
          value={nuevoEvento.descripcion}
          onChange={handleChange}
        ></textarea>
        <button onClick={crearEvento}>Crear Evento</button>
      </div>
    </div>
  );
};
export default Eventos;
