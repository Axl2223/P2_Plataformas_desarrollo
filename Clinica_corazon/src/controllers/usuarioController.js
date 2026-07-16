const Usuario = require('../models/Usuario');

// GET usuarios?rol=medico
async function obtenerUsuarios(req, res) {
  try {
    const filtro = {};
    if (req.query.rol) filtro.rol = req.query.rol;

    const usuarios = await Usuario.find(filtro).sort({ createdAt: -1 });
    res.json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
}

//GET
async function obtenerUsuarioPorId(req, res) {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario)
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: 'ID inválido', error: error.message });
  }
}

//POST protegido lo usa el admin para crear médicos/pacientes
async function crearUsuario(req, res) {
  try {
    const { nombre, email, password, rol, especialidad } = req.body;

    if (rol === 'medico' && !especialidad) {
      return res
        .status(400)
        .json({ mensaje: 'La especialidad es obligatoria para médicos' });
    }
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password,
      rol,
      especialidad,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: 'Ese email ya está registrado' });
    }
    res
      .status(400)
      .json({ mensaje: 'Error al crear usuario', error: error.message });
  }
}

//PUT
async function actualizarUsuario(req, res) {
  try {
    const datos = { ...req.body };
    //si no mandan password, no lo pisa con vacío
    if (!datos.password) delete datos.password;
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario)
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    Object.assign(usuario, datos);
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: 'Ese email ya está en uso' });
    }
    res
      .status(400)
      .json({ mensaje: 'Error al actualizar usuario', error: error.message });
  }
}

//DELETE
async function eliminarUsuario(req, res) {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario)
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: 'Error al eliminar usuario', error: error.message });
  }
}
module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
