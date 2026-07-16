import { createContext, useContext, useState, useCallback } from 'react';
import { getTurnos, crearTurno, actualizarTurno } from '../services/api';

const TurnosContext = createContext();

export function TurnosProvider({ children }) {
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(false);

  //Trae los turnos desde la API. Se llama con useEffect en cada pantalla.
  const cargarTurnos = useCallback(async () => {
    setCargando(true);
    try {
      setTurnos(await getTurnos());
    } catch {
      setTurnos([]);
    } finally {
      setCargando(false);
    }
  }, []);

  //Crea un turno. Los datos vienen del formulario con nombres del front.
  async function agregarTurno({
    pacienteId,
    medicoId,
    especialidad,
    fecha,
    hora,
  }) {
    try {
      await crearTurno({
        paciente: pacienteId,
        medico: medicoId,
        especialidad,
        fecha,
        hora,
      });
      await cargarTurnos();
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }

  async function cancelarTurno(turnoId) {
    try {
      await actualizarTurno(turnoId, { estado: 'cancelado' });
      await cargarTurnos();
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }

  async function marcarAtendido(turnoId) {
    try {
      await actualizarTurno(turnoId, { estado: 'atendido' });
      await cargarTurnos();
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }

  return (
    <TurnosContext.Provider
      value={{
        turnos,
        cargando,
        cargarTurnos,
        agregarTurno,
        cancelarTurno,
        marcarAtendido,
      }}
    >
      {children}
    </TurnosContext.Provider>
  );
}

export function useTurnos() {
  return useContext(TurnosContext);
}
