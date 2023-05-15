const { User } = require('../db.js');
const { compare } = require('../utils/HashPassword.js');

const loginCtrl = async (email, password) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) return 'Email invalido';

  const checkPassword = await compare(password, user.password);
  if (!checkPassword) return 'Contraseña incorrecta';

  return user;
};

module.exports = { loginCtrl };
