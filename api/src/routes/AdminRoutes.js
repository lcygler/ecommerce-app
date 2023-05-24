require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { Admin } = require('../db');
const { encrypt, compare } = require('../utils/HashPassword');
const { generateToken } = require('../utils/Token');

// Crear un nuevo administrador
router.post('/register', async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    // Validar los datos del administrador
    if (!name || !lastname || !email || !password) {
      return res.status(400).send('Faltan datos');
    }

    // Verificar si ya existe un administrador
    let adminCount = parseInt(process.env.ADMIN_COUNT);
    const existingAdmins = await Admin.findAndCountAll();
    if (existingAdmins.count >= adminCount) {
      return res.status(400).send('Ya existe un administrador en el sistema');
    }

    // Verificar si el administrador ya existe en la base de datos
    const existingAdmin = await Admin.findOne({
      where: {
        email: email,
      },
    });
    if (existingAdmin) {
      return res.status(400).send('El email ya está en uso');
    }

    // Generar el hash de la contraseña
    const passwordHash = await encrypt(password);

    // Crear el administrador en la base de datos
    const createAdmin = await Admin.create({
      name,
      lastname,
      email,
      password: passwordHash,
    });

    // Incrementar el contador de administradores creados
    adminCount++;

    // Generar el token para el administrador
    const token = generateToken({ id: createAdmin.id, email: createAdmin.email });

    // Devolver el token en la respuesta
    return res.status(201).send({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al crear el administrador');
  }
});
// Iniciar sesión como administrador
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el administrador existe en la base de datos
    const admin = await Admin.findOne({
      where: {
        email: email,
      },
    });

    if (!admin) {
      return res.status(401).send('Credenciales incorrectas');
    }

    // Verificar si la contraseña proporcionada coincide con la contraseña almacenada
    const isMatchedPassword = await compare(password, admin.password);
    if(!isMatchedPassword) {
      return res.status(401).send('Credenciales incorrectas');
    }


    // Generar el token para el administrador
    const token = generateToken({ id: admin.id, email: admin.email });

    // Devolver el token en la respuesta
    return res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al iniciar sesión');
  }
});

module.exports = router;
