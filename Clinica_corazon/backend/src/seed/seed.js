require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');

const usuariosSemilla = [
  {
    nombre: 'Administrador',
    email: 'admin@turnos.com',
    password: '1234',
    rol: 'admin',
  },
  {
    nombre: 'María Gómez',
    email: 'paciente@turnos.com',
    password: '1234',
    rol: 'paciente',
  },
  {
    nombre: 'Dr. Juan Pérez',
    email: 'medico@turnos.com',
    password: '1234',
    rol: 'medico',
    especialidad: 'Clínica Médica',
  },
  {
    nombre: 'Dra. Laura Sosa',
    email: 'medico2@turnos.com',
    password: 'medico123',
    rol: 'medico',
    especialidad: 'Pediatría',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB para seed...');

    await Usuario.deleteMany({});
    console.log('Usuarios anteriores eliminados');

    for (const datos of usuariosSemilla) {
      await Usuario.create(datos);
    }

    console.log(
      `${usuariosSemilla.length} usuarios de prueba creados con éxito`,
    );
    process.exit(0);
  } catch (error) {
    console.error('Error en el seed:', error.message);
    process.exit(1);
  }
}

seed();
