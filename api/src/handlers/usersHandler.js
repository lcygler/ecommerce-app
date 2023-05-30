const { registerCtrl } = require('../controllers/userRegister');
const { loginCtrl, loginGoogle } = require('../controllers/userLogin');

const postRegister = async (req, res) => {
  try {
    const userData = {
      ...req.body,
    };
    const newUser = await registerCtrl(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginCtrl(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

const google = async (req, res) => {
  try {
    const userData = { ...req.body };
    const user = await loginGoogle(userData);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

module.exports = { postRegister, postLogin, google };
