import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardMedico from './DashboardMedico';

function Dashboard() {
  const { usuarioActual } = useAuth();

  if (usuarioActual?.rol === 'admin') {
    return (
      <Navigate
        to='/dashboard/admin'
        replace
      />
    );
  }
  if (usuarioActual?.rol === 'paciente') {
    return (
      <Navigate
        to='/dashboard/paciente'
        replace
      />
    );
  }
  if (usuarioActual?.rol === 'medico') return <DashboardMedico />;

  return null;
}

export default Dashboard;
