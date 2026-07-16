import { useState, useEffect } from 'react';

function PacienteForm({ pacienteEditando, onGuardar, onCancelar }) {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (pacienteEditando) {
      setForm({
        nombre: pacienteEditando.nombre,
        email: pacienteEditando.email,
        password: '',
      });
    } else {
      setForm({ nombre: '', email: '', password: '' });
    }
    setError('');
  }, [pacienteEditando]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const { nombre, email, password } = form;

    if (!nombre || !email) {
      setError('Completá todos los campos');
      return;
    }

    if (!pacienteEditando && !password) {
      setError('La contraseña es obligatoria');
      return;
    }

    if (password && password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const datos = { nombre, email };
    if (password) datos.password = password;

    const resultado = await onGuardar(datos);

    if (resultado && !resultado.exito) {
      setError(resultado.mensaje);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white p-6 rounded-lg shadow space-y-4'
    >
      <h3 className='text-lg font-bold text-brand-600'>
        {pacienteEditando ? 'Editar paciente' : 'Nuevo paciente'}
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
          {pacienteEditando && (
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
          className='flex-1 bg-brand-600 text-white py-2 rounded hover:bg-brand-700 transition'
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

export default PacienteForm;
