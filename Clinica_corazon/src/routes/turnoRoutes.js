const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middleware/auth');
const {
  obtenerTurnos,
  obtenerTurnoPorId,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
} = require('../controllers/turnoController');

router.get('/', obtenerTurnos);
router.get('/:id', obtenerTurnoPorId);

router.post('/', verificarToken, crearTurno);
router.put('/:id', verificarToken, actualizarTurno);
router.delete('/:id', verificarToken, eliminarTurno);

module.exports = router;
