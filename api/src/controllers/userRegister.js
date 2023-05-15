const { User } = require('../db.js');
const { encrypt } = require('../utils/HashPassword.js');

const registerCtrl = async (
  name,
  lastname,
  username,
  email,
  password,
  birthdate,
  phoneNumber,
  isAdmin
) => {
  if (!name) throw new Error('El nombre es requerido');
  if (!lastname) throw new Error('El apellido es requerido');
  if (!username) throw new Error('El nombre de usuario es requerido');
  if (!email) throw new Error('El email es requerido');
  if (!password) throw new Error('La contraseña es requerida');
  if (!birthdate) throw new Error('La fecha de nacimiento es requerida');
  if (!phoneNumber) throw new Error('El numero de telefono es requerido');

  const passwordHash = await encrypt(password);
  const createUser = await User.create({
    name,
    lastname,
    username,
    email,
    password: passwordHash,
    birthdate,
    phoneNumber,
    isAdmin,
  });
  return createUser;
};

module.exports = { registerCtrl };
