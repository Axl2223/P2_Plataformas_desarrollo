function PacienteList({ pacientes, onEditar, onEliminar }) {
  if (pacientes.length === 0) {
    return <p className='text-gray-500 text-sm'>No hay pacientes cargados.</p>;
  }

  return (
    <div className='space-y-3'>
      {pacientes.map((paciente) => (
        <div
          key={paciente.id}
          className='bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'
        >
          <div>
            <p className='font-bold text-gray-800'>{paciente.nombre}</p>
            <p className='text-sm text-gray-500'>{paciente.email}</p>
          </div>

          <div className='flex gap-3'>
            <button
              onClick={() => onEditar(paciente)}
              className='text-sm text-brand-600 hover:underline'
            >
              Editar
            </button>
            <button
              onClick={() => onEliminar(paciente.id)}
              className='text-sm text-red-600 hover:underline'
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PacienteList;
