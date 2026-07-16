import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoClinica from '../assets/logo-clinica.jpg';

function Register() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
  });
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const { registrarPaciente } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
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

    setEnviando(true);
    const resultado = await registrarPaciente({ nombre, email, password });
    setEnviando(false);

    if (resultado.exito) {
      navigate('/dashboard');
    } else {
      setError(resultado.mensaje);
    }
  }

  return (
    <div className='min-h-screen flex'>
      <div className='hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-brand-100 via-brand-200 to-brand-300 relative overflow-hidden'>
        <div className='absolute -top-16 -left-16 w-64 h-64 rounded-full bg-brand-300/40' />
        <div className='absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-brand-400/30' />

        <div className='relative z-10 flex flex-col items-center px-8'>
          <img
            src={logoClinica}
            alt='Clínica Corazón'
            className='w-56 lg:w-72 drop-shadow-md'
          />
          <p className='mt-6 text-brand-800 text-lg font-medium text-center'>
            Clinica Corazón
          </p>
        </div>
      </div>

      <div className='w-full md:w-1/2 flex items-center justify-center px-4 py-12 bg-gray-50'>
        <form
          onSubmit={handleSubmit}
          className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-brand-100'
        >
          <h1 className='text-2xl font-bold text-brand-700 mb-6 text-center'>
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
            disabled={enviando}
            className='w-full bg-brand-600 text-white py-2 rounded hover:bg-brand-700 transition disabled:opacity-60'
          >
            {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
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
    </div>
  );
}

export default Register;
