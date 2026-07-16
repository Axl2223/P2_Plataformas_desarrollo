import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTurnos } from '../../context/TurnosContext';
import TurnoCard from '../../component/TurnoCard';

function AdminTurnos() {
  const { medicos } = useAuth();
  const { turnos, cargarTurnos, cancelarTurno } = useTurnos();

  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroMedico, setFiltroMedico] = useState('todos');

  useEffect(() => {
    cargarTurnos();
  }, [cargarTurnos]);

  const turnosFiltrados = useMemo(() => {
    return turnos
      .filter((t) =>
        filtroEstado === 'todos' ? true : t.estado === filtroEstado,
      )
      .filter((t) =>
        filtroMedico === 'todos' ? true : t.medicoId === filtroMedico,
      )
      .sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));
  }, [turnos, filtroEstado, filtroMedico]);

  return (
    <div>
      <h3 className='text-lg font-bold text-gray-800 mb-4'>
        Todos los turnos ({turnos.length})
      </h3>

      <div className='bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <label className='block text-xs font-medium text-gray-500 mb-1'>
            Estado
          </label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className='w-full border border-gray-300 rounded px-3 py-2 text-sm'
          >
            <option value='todos'>Todos</option>
            <option value='pendiente'>Pendiente</option>
            <option value='atendido'>Atendido</option>
            <option value='cancelado'>Cancelado</option>
          </select>
        </div>

        <div className='flex-1'>
          <label className='block text-xs font-medium text-gray-500 mb-1'>
            Médico
          </label>
          <select
            value={filtroMedico}
            onChange={(e) => setFiltroMedico(e.target.value)}
            className='w-full border border-gray-300 rounded px-3 py-2 text-sm'
          >
            <option value='todos'>Todos</option>
            {medicos.map((m) => (
              <option
                key={m.id}
                value={m.id}
              >
                {m.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {turnosFiltrados.length === 0 ? (
        <p className='text-gray-500 text-sm'>
          No hay turnos que coincidan con el filtro.
        </p>
      ) : (
        <div className='space-y-3'>
          {turnosFiltrados.map((turno) => (
            <TurnoCard
              key={turno.id}
              turno={turno}
              vista='admin'
              onCancelar={cancelarTurno}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminTurnos;
