import { Link, useNavigate } from 'react-router-dom';
import TurnoForm from '../../component/TurnoForm';

function PacienteNuevo() {
  const navigate = useNavigate();

  return (
    <div>
      <Link
        to='/dashboard/paciente'
        className='text-sm text-brand-600 hover:underline mb-4 inline-block'
      >
        Volver
      </Link>
      <TurnoForm
        onTurnoCreado={() => navigate('/dashboard/paciente/mis-turnos')}
      />
    </div>
  );
}

export default PacienteNuevo;
