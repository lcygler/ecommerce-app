const { registerCtrl } = require('../controllers/userRegister');
const { loginCtrl } = require('../controllers/userLogin');
const postRegister = async (req, res) => {
  try {
    const { name, lastname, username, email, password, birthdate, phoneNumber } = req.body;

    if (!name) {
      res.status(400);
      res.send({ error: 'El nombre es requerido' });
    }
    if (!lastname) {
      res.status(400);
      res.send({ error: 'El apellido es requerido' });
    }
    if (!username) {
      res.status(400);
      res.send({ error: 'El nombre de usuario es requerido' });
    }
    if (!email) {
      res.status(400);
      res.send({ error: 'El email es requerido' });
    }
    if (!password) {
      res.status(400);
      res.send({ error: 'La contraseña es requerida' });
    }
    if (!birthdate) {
      res.status(400);
      res.send({ error: 'La fecha de nacimiento es requerida' });
    }
    if (!phoneNumber) {
      res.status(400);
      res.send({ error: 'El numero de telefono es requerido' });
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
    res.status(201).json(response.dataValues);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginCtrl(email, password);
    res.status(201).json(response.dataValues);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postRegister, postLogin };
