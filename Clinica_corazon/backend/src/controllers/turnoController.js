const Turno = require('../models/Turno');

async function obtenerTurnos(req, res) {
  try {
    const filtro = {};
    if (req.query.paciente) filtro.paciente = req.query.paciente;
    if (req.query.medico) filtro.medico = req.query.medico;

    const turnos = await Turno.find(filtro)
      .populate('paciente', 'nombre email')
      .populate('medico', 'nombre especialidad')
      .sort({ fecha: 1, hora: 1 });

    res.json(turnos);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al obtener turnos', error: error.message });
  }
}

async function obtenerTurnoPorId(req, res) {
  try {
    const turno = await Turno.findById(req.params.id)
      .populate('paciente', 'nombre email')
      .populate('medico', 'nombre especialidad');
    if (!turno) return res.status(404).json({ mensaje: 'Turno no encontrado' });
    res.json(turno);
  } catch (error) {
    res.status(400).json({ mensaje: 'ID inválido', error: error.message });
  }
}

//POSTcrear un nuevo turno
async function crearTurno(req, res) {
  try {
    const { paciente, medico, especialidad, fecha, hora } = req.body;

    const turnoDuplicado = await Turno.findOne({
      medico,
      fecha,
      hora,
      estado: { $ne: 'cancelado' },
    });

    if (turnoDuplicado) {
      return res
        .status(409)
        .json({
          mensaje: 'Ese médico ya tiene un turno ocupado en ese horario',
        });
    }

    const nuevoTurno = await Turno.create({
      paciente,
      medico,
      especialidad,
      fecha,
      hora,
    });
    res.status(201).json(nuevoTurno);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: 'Error al crear turno', error: error.message });
  }
}

//PUT  editar datos o cambiar estado
async function actualizarTurno(req, res) {
  try {
    const turno = await Turno.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!turno) return res.status(404).json({ mensaje: 'Turno no encontrado' });
    res.json(turno);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: 'Error al actualizar turno', error: error.message });
  }
}

// DELETE protegido - eliminar un turno
async function eliminarTurno(req, res) {
  try {
    const turno = await Turno.findByIdAndDelete(req.params.id);
    if (!turno) return res.status(404).json({ mensaje: 'Turno no encontrado' });
    res.json({ mensaje: 'Turno eliminado correctamente' });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: 'Error al eliminar turno', error: error.message });
  }
}

module.exports = {
  obtenerTurnos,
  obtenerTurnoPorId,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
};
