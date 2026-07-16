const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

function generarToken(usuario) {
  return jwt.sign(
    {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' },
  );
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ mensaje: 'Email y contraseña son obligatorios' });
    }

    const usuario = await Usuario.findOne({ email: email.toLowerCase() });
    if (!usuario) {
      return res
        .status(401)
        .json({ mensaje: 'Email o contraseña incorrectos' });
    }

    const passwordValido = await usuario.compararPassword(password);
    if (!passwordValido) {
      return res
        .status(401)
        .json({ mensaje: 'Email o contraseña incorrectos' });
    }

    const token = generarToken(usuario);
    res.json({ token, usuario });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
}

//registro público, siempre crea rol paciente
async function register(req, res) {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res
        .status(400)
        .json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const yaExiste = await Usuario.findOne({ email: email.toLowerCase() });
    if (yaExiste) {
      return res.status(409).json({ mensaje: 'Ese email ya está registrado' });
    }

    const nuevoPaciente = await Usuario.create({
      nombre,
      email,
      password,
      rol: 'paciente',
    });

    const token = generarToken(nuevoPaciente);
    res.status(201).json({ token, usuario: nuevoPaciente });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: 'Error al registrar', error: error.message });
  }
}

module.exports = { login, register };
