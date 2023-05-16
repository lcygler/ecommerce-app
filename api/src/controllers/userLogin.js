const { User } = require('../db.js');
const { compare } = require('../utils/HashPassword.js');

const loginCtrl = async (email, password) => {
  //* Verificar si el usuario existe
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) throw new Error('Email invalido');

  //* Verificar si las contraseñas coinciden
  const checkPassword = await compare(password, user.password);
  if (!checkPassword) throw new Error('Contraseña incorrecta');

  return user;
};

module.exports = { loginCtrl };
