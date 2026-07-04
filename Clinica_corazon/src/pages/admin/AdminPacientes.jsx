import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PacienteForm from '../../component/PacienteForm';
import PacienteList from '../../component/PacienteList';
function AdminPacientes() {
  const { pacientes, agregarPaciente, editarPaciente, eliminarPaciente } =
    useAuth();
  const [pacienteEditando, setPacienteEditando] = useState(null);

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
  return (
    <div>
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
  );
}

export default AdminPacientes;
