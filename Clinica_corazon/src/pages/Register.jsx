import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
  });
  const [error, setError] = useState('');
  const { registrarPaciente } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const { nombre, email, password, confirmarPassword } = form;

    if (!nombre || !email || !password || !confirmarPassword) {
      setError('Completá todos los campos');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const resultado = registrarPaciente({ nombre, email, password });

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
          Crear cuenta
        </h1>
        <p className='text-xs text-gray-400 text-center mb-6'>
          El registro es solo para pacientes
        </p>

        {error && (
          <p className='bg-red-100 text-red-600 text-sm p-2 rounded mb-4'>
            {error}
          </p>
        )}

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Nombre completo
          </label>
          <input
            type='text'
            name='nombre'
            value={form.nombre}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Email
          </label>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Contraseña
          </label>
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400'
          />
        </div>

        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Confirmar contraseña
          </label>
          <input
            type='password'
            name='confirmarPassword'
            value={form.confirmarPassword}
            onChange={handleChange}
            className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-brand-600 text-white py-2 rounded hover:bg-brand-700 transition'
        >
          Crear cuenta
        </button>

        <p className='text-sm text-center text-gray-600 mt-4'>
          ¿Ya tenés cuenta?{' '}
          <Link
            to='/'
            className='text-brand-600 hover:underline'
          >
            Iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
