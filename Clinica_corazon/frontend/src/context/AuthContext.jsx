import { createContext, useContext, useState, useEffect } from 'react';
import {
  loginRequest,
  registerRequest,
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  guardarSesion,
  borrarSesion,
  leerUsuario,
} from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  //Restaura la sesión guardada al recargar la página
  const [usuarioActual, setUsuarioActual] = useState(() => leerUsuario());
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  //Carga médicos y pacientes desde la api cuando hay un usuario logueado
  useEffect(() => {
    if (!usuarioActual) {
      setMedicos([]);
      setPacientes([]);
      return;
    }
    cargarMedicos();
    cargarPacientes();
  }, [usuarioActual]);

  async function cargarMedicos() {
    try {
      setMedicos(await getUsuarios('medico'));
    } catch {
      setMedicos([]);
    }
  }

  async function cargarPacientes() {
    try {
      setPacientes(await getUsuarios('paciente'));
    } catch {
      setPacientes([]);
    }
  }

  async function login(email, password) {
    try {
      const { token, usuario } = await loginRequest(email, password);
      guardarSesion(token, usuario);
      setUsuarioActual(usuario);
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }

  function logout() {
    borrarSesion();
    setUsuarioActual(null);
  }

  async function registrarPaciente({ nombre, email, password }) {
    try {
      const { token, usuario } = await registerRequest({
        nombre,
        email,
        password,
      });
      guardarSesion(token, usuario);
      setUsuarioActual(usuario);
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }

  //Gestión de médicos para admin
  async function agregarMedico({ nombre, especialidad, email, password }) {
    try {
      await crearUsuario({
        nombre,
        especialidad,
        email,
        password,
        rol: 'medico',
      });
      await cargarMedicos();
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }

  async function editarMedico(id, datos) {
    try {
      await actualizarUsuario(id, datos);
      await cargarMedicos();
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }

  async function eliminarMedico(id) {
    try {
      await eliminarUsuario(id);
      await cargarMedicos();
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }

  //Gestion de pacientes para admin
  async function agregarPaciente({ nombre, email, password }) {
    try {
      await crearUsuario({ nombre, email, password, rol: 'paciente' });
      await cargarPacientes();
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }

  async function editarPaciente(id, datos) {
    try {
      await actualizarUsuario(id, datos);
      await cargarPacientes();
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }

  async function eliminarPaciente(id) {
    try {
      await eliminarUsuario(id);
      await cargarPacientes();
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
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
        cargarMedicos,
        cargarPacientes,
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
