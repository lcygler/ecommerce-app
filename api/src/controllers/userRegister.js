const { User } = require("../db.js");
const { encrypt } = require("../utils/HashPassword.js");

const registerCtrl = async (
  name,
  lastname,
  username,
  email,
  password,
  birthdate,
  phoneNumber
) => {
  if (!name) throw error("El nombre es requerido");
  if (!lastname) throw error("El apellido es requerido");
  if (!username) throw error("El nombre de usuario es requerido");
  if (!email) throw error("El email es requerido");
  if (!password) throw error("La contraseña es requerida");
  if (!birthdate) throw error("La fecha de nacimiento es requerida");
  if (!phoneNumber) throw error("El numero de telefono es requerido");

  const passwordHash = await encrypt(password);
  const createUser = await User.create({
    name,
    lastname,
    username,
    email,
    password: passwordHash,
    birthdate,
    phoneNumber,
  });
  return createUser;
};

module.exports = { registerCtrl };
