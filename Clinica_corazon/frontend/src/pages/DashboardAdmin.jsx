import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../component/Navbar';
import AsideAdmin from '../component/AsideAdmin';

function DashboardAdmin() {
  const { usuarioActual } = useAuth();

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='relative overflow-hidden w-full bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-6 py-10 sm:py-14'>
        <div className='absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10' />
        <div className='absolute -bottom-16 -left-8 w-56 h-56 rounded-full bg-white/10' />
        <div className='relative z-10 max-w-5xl mx-auto'>
          <h2 className='text-2xl sm:text-3xl font-bold text-white mb-2'>
            Bienvenido/a, {usuarioActual?.nombre}!
          </h2>
          <p className='text-brand-50 text-sm sm:text-base'>
            ¿Qué desea realizar hoy?
          </p>
        </div>
      </div>

      <main className='max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6'>
        <AsideAdmin />
        <div className='flex-1 min-w-0'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardAdmin;
