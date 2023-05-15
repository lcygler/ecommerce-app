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
