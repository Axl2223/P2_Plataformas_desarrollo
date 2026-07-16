//URL base de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

//Manejo del token en localStorage
export function guardarSesion(token, usuario) {
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
}

export function leerToken() {
  return localStorage.getItem('token');
}

export function leerUsuario() {
  const raw = localStorage.getItem('usuario');
  return raw ? JSON.parse(raw) : null;
}

export function borrarSesion() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

//Helper genérico de fetch
async function request(endpoint, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = leerToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const mensaje = data?.mensaje || 'Ocurrió un error en la solicitud';
    throw new Error(mensaje);
  }

  return data;
}

//la API usa _id, el front usa id
function normalizarUsuario(u) {
  return { ...u, id: u._id };
}

function normalizarTurno(t) {
  return {
    id: t._id,
    pacienteId: t.paciente?._id ?? t.paciente,
    pacienteNombre: t.paciente?.nombre ?? '',
    medicoId: t.medico?._id ?? t.medico,
    medicoNombre: t.medico?.nombre ?? '',
    especialidad: t.especialidad,
    fecha: t.fecha,
    hora: t.hora,
    estado: t.estado,
  };
}

//AUTENTICACIÓN
export async function loginRequest(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  return { token: data.token, usuario: normalizarUsuario(data.usuario) };
}

export async function registerRequest({ nombre, email, password }) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: { nombre, email, password },
  });
  return { token: data.token, usuario: normalizarUsuario(data.usuario) };
}

//USUARIOS
export async function getUsuarios(rol) {
  const query = rol ? `?rol=${rol}` : '';
  const data = await request(`/usuarios${query}`);
  return data.map(normalizarUsuario);
}

export async function crearUsuario(datos) {
  const data = await request('/usuarios', { method: 'POST', body: datos });
  return normalizarUsuario(data);
}

export async function actualizarUsuario(id, datos) {
  const data = await request(`/usuarios/${id}`, { method: 'PUT', body: datos });
  return normalizarUsuario(data);
}

export async function eliminarUsuario(id) {
  return request(`/usuarios/${id}`, { method: 'DELETE' });
}

//TURNOS
export async function getTurnos() {
  const data = await request('/turnos');
  return data.map(normalizarTurno);
}

export async function crearTurno(datos) {
  const data = await request('/turnos', { method: 'POST', body: datos });
  return normalizarTurno(data);
}

export async function actualizarTurno(id, datos) {
  const data = await request(`/turnos/${id}`, { method: 'PUT', body: datos });
  return normalizarTurno(data);
}

export async function eliminarTurno(id) {
  return request(`/turnos/${id}`, { method: 'DELETE' });
}
