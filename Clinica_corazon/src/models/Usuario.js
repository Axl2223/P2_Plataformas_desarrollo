const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'El email no tiene un formato válido'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [4, 'La contraseña debe tener al menos 4 caracteres'],
    },
    rol: {
      type: String,
      enum: ['admin', 'medico', 'paciente'],
      required: true,
      default: 'paciente',
    },
    especialidad: {
      type: String,
      trim: true,
      //solo aplicac cuando el rol es medico
    },
  },
  { timestamps: true },
);

//hashea el password
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

usuarioSchema.methods.compararPassword = function (passwordIngresado) {
  return bcrypt.compare(passwordIngresado, this.password);
};

//nunca devolver el password en las respuestas JSON
usuarioSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
