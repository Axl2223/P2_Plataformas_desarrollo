const express = require('express');
const router = express.Router();
const { verificarToken, permitirRoles } = require('../middleware/auth');
const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require('../controllers/usuarioController');

//requiere token válido para cualquier rol registrado
router.get('/', verificarToken, obtenerUsuarios);
router.get('/:id', verificarToken, obtenerUsuarioPorId);

//solo el administrador puede gestionar médicos y pacientes
router.post('/', verificarToken, permitirRoles('admin'), crearUsuario);
router.put('/:id', verificarToken, permitirRoles('admin'), actualizarUsuario);
router.delete('/:id', verificarToken, permitirRoles('admin'), eliminarUsuario);

module.exports = router;
