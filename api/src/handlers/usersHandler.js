const { registerCtrl } = require('../controllers/userRegister');
const { loginCtrl, loginGoogle } = require('../controllers/userLogin');

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
    console.log(response);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginCtrl(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const google = async (req, res) => {
  try {
    const userData = { ...req.body };
    const user = await loginGoogle(userData);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Server error' });
  }
};

module.exports = { postRegister, postLogin, google };
