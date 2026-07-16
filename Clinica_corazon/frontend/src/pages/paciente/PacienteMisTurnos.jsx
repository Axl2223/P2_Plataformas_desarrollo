import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTurnos } from '../../context/TurnosContext';
import TurnoCard from '../../component/TurnoCard';

function PacienteMisTurnos() {
  const { usuarioActual } = useAuth();
  const { turnos, cargarTurnos, cancelarTurno } = useTurnos();

  useEffect(() => {
    cargarTurnos();
  }, [cargarTurnos]);

  const misTurnos = turnos.filter((t) => t.pacienteId === usuarioActual.id);

  return (
    <div>
      <Link
        to='/dashboard/paciente'
        className='text-sm text-brand-600 hover:underline mb-4 inline-block'
      >
        Volver
      </Link>

      <h3 className='text-lg font-bold text-gray-800 mb-3'>Mis turnos</h3>

      {misTurnos.length === 0 ? (
        <p className='text-gray-500 text-sm'>
          Todavía no tenés turnos reservados.
        </p>
      ) : (
        <div className='space-y-3'>
          {misTurnos.map((turno) => (
            <TurnoCard
              key={turno.id}
              turno={turno}
              onCancelar={cancelarTurno}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PacienteMisTurnos;
