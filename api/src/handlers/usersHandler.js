const { registerCtrl } = require("../controllers/userRegister");
const { tokenSing } = require("../utils/generateToken");
const { User } = require("../db.js");
const { compare } = require("../utils/HashPassword.js");

const postRegister = async (req, res) => {
  try {
    const {
      name,
      lastname,
      username,
      email,
      password,
      birthdate,
      phoneNumber,
    } = req.body;

    if (!name) {
      res.status(400);
      res.send({ error: "El nombre es requerido" });
    }
    if (!lastname) {
      res.status(400);
      res.send({ error: "El apellido es requerido" });
    }
    if (!username) {
      res.status(400);
      res.send({ error: "El nombre de usuario es requerido" });
    }
    if (!email) {
      res.status(400);
      res.send({ error: "El email es requerido" });
    }
    if (!password) {
      res.status(400);
      res.send({ error: "La contraseña es requerida" });
    }
    if (!birthdate) {
      res.status(400);
      res.send({ error: "La fecha de nacimiento es requerida" });
    }
    if (!phoneNumber) {
      res.status(400);
      res.send({ error: "El numero de telefono es requerido" });
    }

    const response = await registerCtrl(
      name,
      lastname,
      username,
      email,
      password,
      birthdate,
      phoneNumber
    );
    res.status(201).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(400);
      res.send({ error: "Email invalido" });
    }
    const checkPassword = await compare(password, user.password);

    const tokenSession = await tokenSing(user);

    if (checkPassword) {
      res.status(201).send({
        data: user,
        tokenSession,
      });
      return;
    }
    if (!checkPassword) {
      res.status(400);
      res.send({ error: "Contraseña incorrecta" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postRegister, postLogin };
