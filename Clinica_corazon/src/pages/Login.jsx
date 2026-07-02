import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Completá todos los campos');
      return;
    }

    const resultado = login(email, password);

    if (resultado.exito) {
      navigate('/dashboard');
    } else {
      setError(resultado.mensaje);
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'
      >
        <h1 className='text-2xl font-bold text-brand-600 mb-6 text-center'>
          Iniciar Sesión
        </h1>

        {error && (
          <p className='bg-red-100 text-red-600 text-sm p-2 rounded mb-4'>
            {error}
          </p>
        )}

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Email
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400'
            placeholder='admin@turnos.com'
          />
        </div>

        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Contraseña
          </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400'
            placeholder='••••••••'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-brand-600 text-white py-2 rounded hover:bg-brand-700 transition'
        >
          Ingresar
        </button>

        <p className='text-sm text-center text-gray-600 mt-4'>
          ¿No tenés cuenta?{' '}
          <Link
            to='/register'
            className='text-brand-600 hover:underline'
          >
            Registrarme
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
