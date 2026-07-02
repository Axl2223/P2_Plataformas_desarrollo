import { useAuth } from '../context/AuthContext';
import DashboardAdmin from './DashboardAdmin';
import DashboardMedico from './DashboardMedico';
import DashboardPaciente from './DashboardPaciente';

function Dashboard() {
  const { usuarioActual } = useAuth();

  if (usuarioActual?.rol === 'admin') return <DashboardAdmin />;
  if (usuarioActual?.rol === 'medico') return <DashboardMedico />;
  if (usuarioActual?.rol === 'paciente') return <DashboardPaciente />;

  return null;
}

export default Dashboard;
