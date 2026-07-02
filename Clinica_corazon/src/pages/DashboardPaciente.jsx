import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTurnos } from '../context/TurnosContext';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import TurnoForm from '../component/TurnoForm';
import TurnoCard from '../component/TurnoCard';

function DashboardPaciente() {
  const { usuarioActual } = useAuth();
  const { turnos, cancelarTurno } = useTurnos();
  const [vista, setVista] = useState('inicio'); // 'inicio' | 'nuevo' | 'mis-turnos'

  const misTurnos = turnos.filter((t) => t.pacienteId === usuarioActual.id);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Navbar />

      <main className='max-w-4xl mx-auto p-6 flex-1 w-full'>
        <h2 className='text-xl font-semibold text-gray-800 mb-6'>
          Hola, {usuarioActual?.nombre}
        </h2>

        {vista === 'inicio' && (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <button
              onClick={() => setVista('nuevo')}
              className='bg-white p-6 rounded-lg shadow hover:shadow-md transition text-left'
            >
              <h3 className='text-lg font-bold text-brand-600 mb-1'>
                Sacar un turno
              </h3>
              <p className='text-gray-500 text-sm'>
                Elegí un médico y reservá tu turno
              </p>
            </button>

            <button
              onClick={() => setVista('mis-turnos')}
              className='bg-white p-6 rounded-lg shadow hover:shadow-md transition text-left'
            >
              <h3 className='text-lg font-bold text-brand-600 mb-1'>
                Mis turnos
              </h3>
              <p className='text-gray-500 text-sm'>
                Consultá o cancelá tus turnos reservados
              </p>
            </button>
          </div>
        )}

        {vista === 'nuevo' && (
          <div>
            <button
              onClick={() => setVista('inicio')}
              className='text-sm text-brand-600 hover:underline mb-4'
            >
              ← Volver
            </button>
            <TurnoForm onTurnoCreado={() => setVista('mis-turnos')} />
          </div>
        )}

        {vista === 'mis-turnos' && (
          <div>
            <button
              onClick={() => setVista('inicio')}
              className='text-sm text-brand-600 hover:underline mb-4'
            >
              ← Volver
            </button>

            <h3 className='text-lg font-bold text-gray-800 mb-3'>Mis turnos</h3>

            {misTurnos.length === 0 ? (
              <p className='text-gray-500 text-sm'>
                Todavía no tenés turnos reservados.
              </p>
            ) : (
              <div className='space-y-3'>
                {misTurnos.map((turno) => (
                  <TurnoCard
                    key={turno.id}
                    turno={turno}
                    onCancelar={cancelarTurno}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default DashboardPaciente;
