const { User } = require("../db.js");
const { compare } = require("../utils/HashPassword.js");

const loginCtrl = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw error("Email invalido");
  const checkPassword = await compare(password, user.password);
  if (!checkPassword) throw error("Contraseña incorrecta");
  return user;
};

module.exports = { loginCtrl };
