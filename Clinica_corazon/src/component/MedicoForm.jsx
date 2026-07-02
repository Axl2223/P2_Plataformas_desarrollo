import { useState, useEffect } from 'react';

function MedicoForm({ medicoEditando, onGuardar, onCancelar }) {
  const [form, setForm] = useState({
    nombre: '',
    especialidad: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (medicoEditando) {
      setForm({
        nombre: medicoEditando.nombre,
        especialidad: medicoEditando.especialidad,
        email: medicoEditando.email,
        password: '',
      });
    } else {
      setForm({ nombre: '', especialidad: '', email: '', password: '' });
    }
    setError('');
  }, [medicoEditando]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const { nombre, especialidad, email, password } = form;

    if (!nombre || !especialidad || !email) {
      setError('Completá todos los campos');
      return;
    }

    if (!medicoEditando && !password) {
      setError('La contraseña es obligatoria');
      return;
    }

    if (password && password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const datos = { nombre, especialidad, email };
    if (password) datos.password = password;

    const resultado = onGuardar(datos);

    if (resultado && !resultado.exito) {
      setError(resultado.mensaje);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white p-6 rounded-lg shadow space-y-4'
    >
      <h3 className='text-lg font-bold text-teal-600'>
        {medicoEditando ? 'Editar médico' : 'Nuevo médico'}
      </h3>

      {error && (
        <p className='bg-red-100 text-red-600 text-sm p-2 rounded'>{error}</p>
      )}

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Nombre
        </label>
        <input
          type='text'
          name='nombre'
          value={form.nombre}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded px-3 py-2'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Especialidad
        </label>
        <input
          type='text'
          name='especialidad'
          value={form.especialidad}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded px-3 py-2'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Email
        </label>
        <input
          type='email'
          name='email'
          value={form.email}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded px-3 py-2'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Contraseña{' '}
          {medicoEditando && (
            <span className='text-gray-400 text-xs'>
              (dejar en blanco para no cambiar)
            </span>
          )}
        </label>
        <input
          type='password'
          name='password'
          value={form.password}
          onChange={handleChange}
          className='w-full border border-gray-300 rounded px-3 py-2'
        />
      </div>

      <div className='flex gap-3'>
        <button
          type='submit'
          className='flex-1 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition'
        >
          Guardar
        </button>
        <button
          type='button'
          onClick={onCancelar}
          className='flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition'
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default MedicoForm;
