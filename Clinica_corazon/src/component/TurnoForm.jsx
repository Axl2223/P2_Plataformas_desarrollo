import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTurnos } from '../context/TurnosContext';

function TurnoForm({ onTurnoCreado }) {
  const { usuarioActual, medicos } = useAuth();
  const { agregarTurno, existeTurnoDuplicado } = useTurnos();

  const [medicoId, setMedicoId] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const hoy = new Date().toISOString().split('T')[0];

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setExito('');

    if (!medicoId || !fecha || !hora) {
      setError('Completá todos los campos');
      return;
    }

    if (fecha < hoy) {
      setError('La fecha no puede ser anterior a hoy');
      return;
    }

    const medico = medicos.find((m) => m.id === Number(medicoId));

    if (existeTurnoDuplicado(medico.id, fecha, hora)) {
      setError('Ese médico ya tiene un turno ocupado en ese horario');
      return;
    }

    const turno = agregarTurno({
      pacienteId: usuarioActual.id,
      pacienteNombre: usuarioActual.nombre,
      medicoId: medico.id,
      medicoNombre: medico.nombre,
      especialidad: medico.especialidad,
      fecha,
      hora,
    });

    setExito('¡Turno reservado con éxito!');
    setMedicoId('');
    setFecha('');
    setHora('');

    if (onTurnoCreado) onTurnoCreado(turno);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white p-6 rounded-lg shadow space-y-4'
    >
      <h3 className='text-lg font-bold text-brand-600'>Sacar un turno</h3>

      {error && (
        <p className='bg-red-100 text-red-600 text-sm p-2 rounded'>{error}</p>
      )}
      {exito && (
        <p className='bg-green-100 text-green-700 text-sm p-2 rounded'>
          {exito}
        </p>
      )}

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Médico
        </label>
        <select
          value={medicoId}
          onChange={(e) => setMedicoId(e.target.value)}
          className='w-full border border-gray-300 rounded px-3 py-2'
        >
          <option value=''>Seleccioná un médico</option>
          {medicos.map((m) => (
            <option
              key={m.id}
              value={m.id}
            >
              {m.nombre} — {m.especialidad}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Fecha
        </label>
        <input
          type='date'
          min={hoy}
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className='w-full border border-gray-300 rounded px-3 py-2'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Hora
        </label>
        <input
          type='time'
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className='w-full border border-gray-300 rounded px-3 py-2'
        />
      </div>

      <button
        type='submit'
        className='w-full bg-brand-600 text-white py-2 rounded hover:bg-brand-700 transition'
      >
        Confirmar turno
      </button>
    </form>
  );
}

export default TurnoForm;
