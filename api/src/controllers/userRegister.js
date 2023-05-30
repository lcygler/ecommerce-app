const jwt = require('jsonwebtoken');
const { User, ShippingAddress } = require('../db.js');
const { encrypt } = require('../utils/HashPassword.js');
const { sendWelcomeEmail } = require('../utils/mail.config.js');

const registerCtrl = async ({
  name,
  lastname,
  username,
  email,
  password,
  birthdate,
  phoneNumber,
  address,
  postalCode,
  state,
  country,
  isAdmin,
}) => {
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
    address,
    postalCode,
    state,
    country,
    isAdmin,
  });

  const Shipping = await ShippingAddress.create({
    address,
    postalCode,
    state,
    country,
    UserId: createUser.id, // Establecer la relación con el usuario creado
  });

  // Buscar el usuario con la información de ShippingAddress
  const userWithShipping = await User.findOne({
    where: { id: createUser.id },
    include: [ShippingAddress],
  });

  // Generar JWT token
  const token = jwt.sign({ id: createUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  sendWelcomeEmail(email);

  return { user: userWithShipping, token };
};

module.exports = { registerCtrl };
