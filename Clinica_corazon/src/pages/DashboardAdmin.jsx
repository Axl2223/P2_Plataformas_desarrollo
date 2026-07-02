import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTurnos } from '../context/TurnosContext';
import Navbar from '../component/Navbar';
import MedicoForm from '../component/MedicoForm';
import MedicoList from '../component/MedicoList';
import PacienteForm from '../component/PacienteForm';
import PacienteList from '../component/PacienteList';
import TurnoCard from '../component/TurnoCard';

function DashboardAdmin() {
  const {
    medicos,
    pacientes,
    agregarMedico,
    editarMedico,
    eliminarMedico,
    agregarPaciente,
    editarPaciente,
    eliminarPaciente,
  } = useAuth();

  const { turnos, cancelarTurno } = useTurnos();

  const [seccion, setSeccion] = useState('inicio'); // 'inicio' | 'medicos' | 'pacientes' | 'turnos'
  const [medicoEditando, setMedicoEditando] = useState(null);
  const [pacienteEditando, setPacienteEditando] = useState(null);

  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroMedico, setFiltroMedico] = useState('todos');

  function volverInicio() {
    setSeccion('inicio');
    setMedicoEditando(null);
    setPacienteEditando(null);
  }

  function handleGuardarMedico(datos) {
    const resultado = medicoEditando?.id
      ? editarMedico(medicoEditando.id, datos)
      : agregarMedico(datos);

    if (resultado.exito) setMedicoEditando(null);
    return resultado;
  }

  function handleEliminarMedico(id) {
    if (confirm('¿Seguro que querés eliminar este médico?')) {
      eliminarMedico(id);
    }
  }

  function handleGuardarPaciente(datos) {
    const resultado = pacienteEditando?.id
      ? editarPaciente(pacienteEditando.id, datos)
      : agregarPaciente(datos);

    if (resultado.exito) setPacienteEditando(null);
    return resultado;
  }

  function handleEliminarPaciente(id) {
    if (confirm('¿Seguro que querés eliminar este paciente?')) {
      eliminarPaciente(id);
    }
  }

  const turnosFiltrados = useMemo(() => {
    return turnos
      .filter((t) =>
        filtroEstado === 'todos' ? true : t.estado === filtroEstado,
      )
      .filter((t) =>
        filtroMedico === 'todos' ? true : t.medicoId === Number(filtroMedico),
      )
      .sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));
  }, [turnos, filtroEstado, filtroMedico]);

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />

      <main className='max-w-4xl mx-auto p-6'>
        <h2 className='text-xl font-semibold text-gray-800 mb-6'>
          Panel de Administrador
        </h2>

        {seccion === 'inicio' && (
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <button
              onClick={() => setSeccion('medicos')}
              className='bg-white p-6 rounded-lg shadow hover:shadow-md transition text-left'
            >
              <h3 className='text-lg font-bold text-teal-600 mb-1'>Médicos</h3>
              <p className='text-gray-500 text-sm'>Gestionar médicos (ABM)</p>
            </button>

            <button
              onClick={() => setSeccion('pacientes')}
              className='bg-white p-6 rounded-lg shadow hover:shadow-md transition text-left'
            >
              <h3 className='text-lg font-bold text-brand-600 mb-1'>
                Pacientes
              </h3>
              <p className='text-gray-500 text-sm'>Gestionar pacientes (ABM)</p>
            </button>

            <button
              onClick={() => setSeccion('turnos')}
              className='bg-white p-6 rounded-lg shadow hover:shadow-md transition text-left'
            >
              <h3 className='text-lg font-bold text-purple-600 mb-1'>Turnos</h3>
              <p className='text-gray-500 text-sm'>
                Ver todos los turnos del sistema
              </p>
            </button>
          </div>
        )}

        {seccion === 'medicos' && (
          <div>
            <button
              onClick={volverInicio}
              className='text-sm text-gray-600 hover:underline mb-4'
            >
              ← Volver
            </button>

            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-bold text-gray-800'>Médicos</h3>
              {!medicoEditando && (
                <button
                  onClick={() => setMedicoEditando({})}
                  className='text-sm bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition'
                >
                  + Nuevo médico
                </button>
              )}
            </div>

            {medicoEditando ? (
              <MedicoForm
                medicoEditando={medicoEditando.id ? medicoEditando : null}
                onGuardar={handleGuardarMedico}
                onCancelar={() => setMedicoEditando(null)}
              />
            ) : (
              <MedicoList
                medicos={medicos}
                onEditar={setMedicoEditando}
                onEliminar={handleEliminarMedico}
              />
            )}
          </div>
        )}

        {seccion === 'pacientes' && (
          <div>
            <button
              onClick={volverInicio}
              className='text-sm text-gray-600 hover:underline mb-4'
            >
              ← Volver
            </button>

            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-bold text-gray-800'>Pacientes</h3>
              {!pacienteEditando && (
                <button
                  onClick={() => setPacienteEditando({})}
                  className='text-sm bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700 transition'
                >
                  + Nuevo paciente
                </button>
              )}
            </div>

            {pacienteEditando ? (
              <PacienteForm
                pacienteEditando={pacienteEditando.id ? pacienteEditando : null}
                onGuardar={handleGuardarPaciente}
                onCancelar={() => setPacienteEditando(null)}
              />
            ) : (
              <PacienteList
                pacientes={pacientes}
                onEditar={setPacienteEditando}
                onEliminar={handleEliminarPaciente}
              />
            )}
          </div>
        )}

        {seccion === 'turnos' && (
          <div>
            <button
              onClick={volverInicio}
              className='text-sm text-gray-600 hover:underline mb-4'
            >
              ← Volver
            </button>

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
        )}
      </main>
    </div>
  );
}

export default DashboardAdmin;
