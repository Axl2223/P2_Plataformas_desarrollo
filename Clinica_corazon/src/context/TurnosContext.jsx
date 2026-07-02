import { createContext, useContext, useState } from 'react';

const TurnosContext = createContext();

export function TurnosProvider({ children }) {
  const [turnos, setTurnos] = useState([]);

  function agregarTurno({
    pacienteId,
    pacienteNombre,
    medicoId,
    medicoNombre,
    especialidad,
    fecha,
    hora,
  }) {
    const nuevoTurno = {
      id: Date.now(),
      pacienteId,
      pacienteNombre,
      medicoId,
      medicoNombre,
      especialidad,
      fecha,
      hora,
      estado: 'pendiente',
    };

    setTurnos((prev) => [...prev, nuevoTurno]);
    return nuevoTurno;
  }

  function cancelarTurno(turnoId) {
    setTurnos((prev) =>
      prev.map((t) => (t.id === turnoId ? { ...t, estado: 'cancelado' } : t)),
    );
  }

  function marcarAtendido(turnoId) {
    setTurnos((prev) =>
      prev.map((t) => (t.id === turnoId ? { ...t, estado: 'atendido' } : t)),
    );
  }

  function existeTurnoDuplicado(medicoId, fecha, hora) {
    return turnos.some(
      (t) =>
        t.medicoId === medicoId &&
        t.fecha === fecha &&
        t.hora === hora &&
        t.estado !== 'cancelado',
    );
  }

  return (
    <TurnosContext.Provider
      value={{
        turnos,
        agregarTurno,
        cancelarTurno,
        marcarAtendido,
        existeTurnoDuplicado,
      }}
    >
      {children}
    </TurnosContext.Provider>
  );
}

export function useTurnos() {
  return useContext(TurnosContext);
}
