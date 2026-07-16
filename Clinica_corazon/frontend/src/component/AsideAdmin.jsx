import { NavLink } from 'react-router-dom';

const OPCIONES = [
  { to: 'medicos', label: 'Médicos', desc: 'Gestionar médicos' },
  { to: 'pacientes', label: 'Pacientes', desc: 'Gestionar pacientes' },
  { to: 'turnos', label: 'Turnos', desc: 'Ver todos los turnos' },
];
function AsideAdmin() {
  return (
    <aside className='w-full md:w-64 md:flex-shrink-0'>
      <div className='flex md:hidden gap-3 overflow-x-auto pb-2 px-1'>
        {OPCIONES.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `whitespace-nowrap px-4 py-2.5 rounded-full transition ${
                isActive
                  ? 'bg-brand-600 text-white shadow'
                  : 'bg-white text-gray-600 hover:bg-brand-50 hover:text-brand-600 shadow-sm'
              }`
            }
          >
            <span className='text-sm font-medium'>{label}</span>
          </NavLink>
        ))}
      </div>
      <nav className='hidden md:flex md:flex-col gap-2 bg-white p-3 rounded-2xl shadow sticky top-6'>
        {OPCIONES.map(({ to, label, desc }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `text-left px-4 py-3 rounded-xl transition ${
                isActive ? 'bg-brand-600 shadow' : 'hover:bg-brand-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <p
                  className={`font-semibold text-sm ${
                    isActive ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {label}
                </p>
                <p
                  className={`text-xs ${
                    isActive ? 'text-brand-50' : 'text-gray-400'
                  }`}
                >
                  {desc}
                </p>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AsideAdmin;
