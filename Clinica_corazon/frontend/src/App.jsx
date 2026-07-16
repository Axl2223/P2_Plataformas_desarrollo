import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DashboardAdmin from './pages/DashboardAdmin';
import AdminInicio from './pages/admin/AdminInicio';
import AdminMedicos from './pages/admin/AdminMedicos';
import AdminPacientes from './pages/admin/AdminPacientes';
import AdminTurnos from './pages/admin/AdminTurnos';
import DashboardPaciente from './pages/DashboardPaciente';
import PacienteInicio from './pages/paciente/PacienteInicio';
import PacienteNuevo from './pages/paciente/PacienteNuevo';
import PacienteMisTurnos from './pages/paciente/PacienteMisTurnos';
import ProtectedRoute from './component/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/dashboard/admin'
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<AdminInicio />}
          />
          <Route
            path='medicos'
            element={<AdminMedicos />}
          />
          <Route
            path='pacientes'
            element={<AdminPacientes />}
          />
          <Route
            path='turnos'
            element={<AdminTurnos />}
          />
        </Route>

        <Route
          path='/dashboard/paciente'
          element={
            <ProtectedRoute>
              <DashboardPaciente />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<PacienteInicio />}
          />
          <Route
            path='nuevo'
            element={<PacienteNuevo />}
          />
          <Route
            path='mis-turnos'
            element={<PacienteMisTurnos />}
          />
        </Route>
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
