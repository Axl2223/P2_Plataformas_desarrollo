import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MedicoForm from '../../component/MedicoForm';
import MedicoList from '../../component/MedicoList';
function AdminMedicos() {
  const { medicos, agregarMedico, editarMedico, eliminarMedico } = useAuth();
  const [medicoEditando, setMedicoEditando] = useState(null);

  async function handleGuardarMedico(datos) {
    const resultado = medicoEditando?.id
      ? await editarMedico(medicoEditando.id, datos)
      : await agregarMedico(datos);

    if (resultado.exito) setMedicoEditando(null);
    return resultado;
  }

  async function handleEliminarMedico(id) {
    if (confirm('¿Seguro que querés eliminar este médico?')) {
      await eliminarMedico(id);
    }
  }
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-bold text-gray-800'>Médicos</h3>
        {!medicoEditando && (
          <button
            onClick={() => setMedicoEditando({})}
            className='text-sm bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700 transition'
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
  );
}

export default AdminMedicos;
