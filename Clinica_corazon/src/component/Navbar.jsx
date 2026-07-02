import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { usuarioActual, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className='bg-white shadow px-6 py-4 flex justify-between items-center'>
      <h1 className='text-xl font-bold text-brand-600'>Sistema de Turnos</h1>

      <div className='flex items-center gap-4'>
        <span className='text-sm text-gray-600 hidden sm:block'>
          {usuarioActual?.nombre}{' '}
          <span className='text-gray-400'>({usuarioActual?.rol})</span>
        </span>
        <button
          onClick={handleLogout}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm'
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Navbar;
