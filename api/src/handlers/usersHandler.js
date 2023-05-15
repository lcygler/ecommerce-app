const { registerCtrl } = require('../controllers/userRegister');
const { loginCtrl } = require('../controllers/userLogin');
const postRegister = async (req, res) => {
  try {
    const { name, lastname, username, email, password, birthdate, phoneNumber, isAdmin } = req.body;
    const response = await registerCtrl(
      name,
      lastname,
      username,
      email,
      password,
      birthdate,
      phoneNumber,
      isAdmin
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
    res.status(200).json(response.dataValues);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postRegister, postLogin };
