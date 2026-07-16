const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema(
  {
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'El turno debe tener un paciente asociado'],
    },
    medico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: [true, 'El turno debe tener un médico asociado'],
    },
    especialidad: {
      type: String,
      required: true,
      trim: true,
    },
    fecha: {
      type: String,
      required: [true, 'La fecha es obligatoria'],
    },
    hora: {
      type: String,
      required: [true, 'La hora es obligatoria'],
    },
    estado: {
      type: String,
      enum: ['pendiente', 'atendido', 'cancelado'],
      default: 'pendiente',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Turno', turnoSchema);
