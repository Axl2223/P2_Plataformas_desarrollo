import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTurnos } from '../context/TurnosContext';
import Navbar from '../component/Navbar';
import TurnoCard from '../component/TurnoCard';

function DashboardMedico() {
  const { usuarioActual } = useAuth();
  const { turnos, cargarTurnos, marcarAtendido } = useTurnos();

  const [filtroFecha, setFiltroFecha] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  useEffect(() => {
    cargarTurnos();
  }, [cargarTurnos]);

  const hoy = new Date().toISOString().split('T')[0];

  const misTurnos = useMemo(
    () => turnos.filter((t) => t.medicoId === usuarioActual.id),
    [turnos, usuarioActual.id],
  );

  const turnosFiltrados = useMemo(() => {
    return misTurnos
      .filter((t) => {
        if (filtroFecha === 'hoy') return t.fecha === hoy;
        if (filtroFecha === 'proximos') return t.fecha >= hoy;
        return true;
      })
      .filter((t) => {
        if (filtroEstado === 'todos') return true;
        return t.estado === filtroEstado;
      })
      .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
  }, [misTurnos, filtroFecha, filtroEstado, hoy]);

  const stats = useMemo(() => {
    const deHoy = misTurnos.filter((t) => t.fecha === hoy);
    return {
      totalHoy: deHoy.length,
      pendientesHoy: deHoy.filter((t) => t.estado === 'pendiente').length,
      pendientesTotal: misTurnos.filter((t) => t.estado === 'pendiente').length,
      atendidosTotal: misTurnos.filter((t) => t.estado === 'atendido').length,
    };
  }, [misTurnos, hoy]);

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='relative overflow-hidden w-full bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-6 py-10 sm:py-14'>
        <div className='absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10' />
        <div className='absolute -bottom-16 -left-8 w-56 h-56 rounded-full bg-white/10' />
        <div className='relative z-10 max-w-4xl mx-auto'>
          <h2 className='text-2xl sm:text-3xl font-bold text-white mb-1'>
            Hola, Dr/a. {usuarioActual?.nombre}
          </h2>
          <p className='text-brand-50 text-sm sm:text-base'>
            {usuarioActual?.especialidad}
          </p>
        </div>
      </div>

      <main className='max-w-4xl mx-auto p-6'>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8'>
          <div className='bg-white p-4 rounded-lg shadow text-center'>
            <p className='text-2xl font-bold text-brand-600'>
              {stats.totalHoy}
            </p>
            <p className='text-xs text-gray-500 mt-1'>Turnos hoy</p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow text-center'>
            <p className='text-2xl font-bold text-yellow-600'>
              {stats.pendientesHoy}
            </p>
            <p className='text-xs text-gray-500 mt-1'>Pendientes hoy</p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow text-center'>
            <p className='text-2xl font-bold text-yellow-600'>
              {stats.pendientesTotal}
            </p>
            <p className='text-xs text-gray-500 mt-1'>Pendientes total</p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow text-center'>
            <p className='text-2xl font-bold text-green-600'>
              {stats.atendidosTotal}
            </p>
            <p className='text-xs text-gray-500 mt-1'>Atendidos</p>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <label className='block text-xs font-medium text-gray-500 mb-1'>
              Fecha
            </label>
            <select
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              className='w-full border border-gray-300 rounded px-3 py-2 text-sm'
            >
              <option value='todos'>Todas</option>
              <option value='hoy'>Hoy</option>
              <option value='proximos'>Próximos (desde hoy)</option>
            </select>
          </div>

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
        </div>

        <h3 className='text-lg font-bold text-gray-800 mb-3'>Mi agenda</h3>

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
                vista='medico'
                onMarcarAtendido={marcarAtendido}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardMedico;
