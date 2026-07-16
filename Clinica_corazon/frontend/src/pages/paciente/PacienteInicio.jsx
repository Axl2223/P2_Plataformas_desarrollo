import { Link } from 'react-router-dom';
import iconTurno from '../../assets/latido-del-corazon.png';
import iconMisTurnos from '../../assets/asistencia-medica.png';

function PacienteInicio() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <Link
        to='/dashboard/paciente/nuevo'
        className='bg-white p-6 rounded-lg shadow hover:shadow-md transition text-left flex items-start gap-4'
      >
        <div className='flex-shrink-0 w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center'>
          <img
            src={iconTurno}
            alt=''
            className='w-8 h-8'
          />
        </div>
        <div>
          <h3 className='text-lg font-bold text-brand-600 mb-1'>
            Sacar un turno
          </h3>
          <p className='text-gray-500 text-sm'>
            Elegí un médico y reservá tu turno
          </p>
        </div>
      </Link>

      <Link
        to='/dashboard/paciente/mis-turnos'
        className='bg-white p-6 rounded-lg shadow hover:shadow-md transition text-left flex items-start gap-4'
      >
        <div className='flex-shrink-0 w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center'>
          <img
            src={iconMisTurnos}
            alt=''
            className='w-8 h-8'
          />
        </div>
        <div>
          <h3 className='text-lg font-bold text-brand-600 mb-1'>Mis turnos</h3>
          <p className='text-gray-500 text-sm'>
            Consultá o cancelá tus turnos reservados
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PacienteInicio;
