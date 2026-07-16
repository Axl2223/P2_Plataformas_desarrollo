import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='text-center'>
        <p className='text-7xl font-extrabold text-brand-600'>404</p>
        <h1 className='mt-4 text-2xl font-bold text-gray-800'>
          Página no encontrada
        </h1>
        <p className='mt-2 text-gray-500'>
          La página que buscás no existe o fue movida.
        </p>
        <Link
          to='/'
          className='inline-block mt-6 bg-brand-600 text-white px-6 py-2 rounded hover:bg-brand-700 transition'
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
