function badgeColor(estado) {
  if (estado === 'pendiente') return 'bg-yellow-100 text-yellow-700';
  if (estado === 'atendido') return 'bg-green-100 text-green-700';
  if (estado === 'cancelado') return 'bg-red-100 text-red-700';
  return 'bg-gray-100 text-gray-700';
}

function TurnoCard({
  turno,
  onCancelar,
  onMarcarAtendido,
  vista = 'paciente',
}) {
  return (
    <div className='bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
      <div>
        {vista === 'paciente' && (
          <>
            <p className='font-bold text-gray-800'>{turno.medicoNombre}</p>
            <p className='text-sm text-gray-500'>{turno.especialidad}</p>
          </>
        )}

        {vista === 'medico' && (
          <>
            <p className='font-bold text-gray-800'>{turno.pacienteNombre}</p>
            <p className='text-sm text-gray-500'>{turno.especialidad}</p>
          </>
        )}

        {vista === 'admin' && (
          <>
            <p className='font-bold text-gray-800'>
              {turno.pacienteNombre}{' '}
              <span className='text-gray-400 font-normal'>con</span>{' '}
              {turno.medicoNombre}
            </p>
            <p className='text-sm text-gray-500'>{turno.especialidad}</p>
          </>
        )}

        <p className='text-sm text-gray-600 mt-1'>
          {turno.fecha} — {turno.hora} hs
        </p>
      </div>

      <div className='flex items-center gap-3'>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${badgeColor(
            turno.estado,
          )}`}
        >
          {turno.estado}
        </span>

        {turno.estado === 'pendiente' && onCancelar && (
          <button
            onClick={() => onCancelar(turno.id)}
            className='text-sm text-red-600 hover:underline'
          >
            Cancelar
          </button>
        )}

        {turno.estado === 'pendiente' && onMarcarAtendido && (
          <button
            onClick={() => onMarcarAtendido(turno.id)}
            className='text-sm bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 transition'
          >
            Marcar atendido
          </button>
        )}
      </div>
    </div>
  );
}

export default TurnoCard;
