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
  if (!name) {
    return "El nombre es requerido";
  }
  if (!lastname) {
    return "El apellido es requerido";
  }
  if (!username) {
    return "El nombre de usuario es requerido";
  }
  if (!email) {
    return "El email es requerido";
  }
  if (!password) {
    return "La contraseña es requerida";
  }
  if (!birthdate) {
    return "La fecha de nacimiento es requerida";
  }
  if (!phoneNumber) {
    return "El número de teléfono es requerido";
  }

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
