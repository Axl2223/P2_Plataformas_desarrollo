function MedicoList({ medicos, onEditar, onEliminar }) {
  if (medicos.length === 0) {
    return <p className='text-gray-500 text-sm'>No hay médicos cargados.</p>;
  }

  return (
    <div className='space-y-3'>
      {medicos.map((medico) => (
        <div
          key={medico.id}
          className='bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'
        >
          <div>
            <p className='font-bold text-gray-800'>{medico.nombre}</p>
            <p className='text-sm text-teal-600'>{medico.especialidad}</p>
            <p className='text-sm text-gray-500'>{medico.email}</p>
          </div>

          <div className='flex gap-3'>
            <button
              onClick={() => onEditar(medico)}
              className='text-sm text-brand-600 hover:underline'
            >
              Editar
            </button>
            <button
              onClick={() => onEliminar(medico.id)}
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

export default MedicoList;
