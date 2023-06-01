const { User } = require('../db.js');
const { Op } = require('sequelize');
const { compare } = require('../utils/HashPassword.js');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../utils/mail.config.js');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  const options = { expiresIn: '1h' }; // el token expirará en 1 hora
  const secret = process.env.JWT_SECRET; // una cadena secreta para firmar el token
  return jwt.sign(payload, secret, options);
};

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

  //* Generar el token
  const token = generateToken(user);

  return { user, token };
};

const loginGoogle = async (userData) => {
  try {
    const { googleId, email, name, lastname, image } = userData;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ googleId }, { email }],
      },
    });

    if (user) {
      const token = generateToken(user);
      return { user, token };
      // return { user, token, registered: true };
    }

    const newUser = await User.create({ googleId, email, name, lastname, image });
    const token = generateToken(newUser);
    sendWelcomeEmail(email);
    return { user: newUser, token };
    // return { user: newUser, token, registered: false };
  } catch (error) {
    throw new Error('Error login with google');
  }
};

module.exports = { loginCtrl, loginGoogle };
