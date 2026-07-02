import { createContext, useContext, useState } from 'react';
import { usuarios as usuariosIniciales } from '../data/usuarios';
import { medicos as medicosIniciales } from '../data/medicos';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [medicos, setMedicos] = useState(medicosIniciales);

  const pacientes = usuarios.filter((u) => u.rol === 'paciente');

  function todasLasPersonas() {
    return [...usuarios, ...medicos];
  }

  function login(email, password) {
    const encontrado = todasLasPersonas().find(
      (p) => p.email === email && p.password === password,
    );

    if (encontrado) {
      setUsuarioActual(encontrado);
      return { exito: true };
    }

    return { exito: false, mensaje: 'Email o contraseña incorrectos' };
  }

  function logout() {
    setUsuarioActual(null);
  }

  function registrarPaciente({ nombre, email, password }) {
    const yaExiste = todasLasPersonas().some((p) => p.email === email);

    if (yaExiste) {
      return { exito: false, mensaje: 'Ese email ya está registrado' };
    }

    const nuevoPaciente = {
      id: Date.now(),
      nombre,
      email,
      password,
      rol: 'paciente',
    };

    setUsuarios((prev) => [...prev, nuevoPaciente]);
    setUsuarioActual(nuevoPaciente);

    return { exito: true };
  }

  function agregarMedico({ nombre, especialidad, email, password }) {
    const yaExiste = todasLasPersonas().some((p) => p.email === email);
    if (yaExiste)
      return { exito: false, mensaje: 'Ese email ya está registrado' };

    const nuevoMedico = {
      id: Date.now(),
      nombre,
      especialidad,
      email,
      password,
      rol: 'medico',
    };

    setMedicos((prev) => [...prev, nuevoMedico]);
    return { exito: true };
  }

  function editarMedico(id, datos) {
    const yaExiste = todasLasPersonas().some(
      (p) => p.email === datos.email && p.id !== id,
    );
    if (yaExiste) return { exito: false, mensaje: 'Ese email ya está en uso' };

    setMedicos((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...datos } : m)),
    );
    return { exito: true };
  }

  function eliminarMedico(id) {
    setMedicos((prev) => prev.filter((m) => m.id !== id));
  }

  function agregarPaciente({ nombre, email, password }) {
    const yaExiste = todasLasPersonas().some((p) => p.email === email);
    if (yaExiste)
      return { exito: false, mensaje: 'Ese email ya está registrado' };

    const nuevoPaciente = {
      id: Date.now(),
      nombre,
      email,
      password,
      rol: 'paciente',
    };

    setUsuarios((prev) => [...prev, nuevoPaciente]);
    return { exito: true };
  }

  function editarPaciente(id, datos) {
    const yaExiste = todasLasPersonas().some(
      (p) => p.email === datos.email && p.id !== id,
    );
    if (yaExiste) return { exito: false, mensaje: 'Ese email ya está en uso' };

    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...datos } : u)),
    );
    return { exito: true };
  }

  function eliminarPaciente(id) {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <AuthContext.Provider
      value={{
        usuarioActual,
        login,
        logout,
        registrarPaciente,
        medicos,
        pacientes,
        agregarMedico,
        editarMedico,
        eliminarMedico,
        agregarPaciente,
        editarPaciente,
        eliminarPaciente,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
