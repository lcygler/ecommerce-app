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
    console.log(response);
    res.status(201).json(response);
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
      res.send({ error: 'Email invalido' });
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
      res.send({ error: 'Contraseña incorrecta' });
    }

    const response = await loginCtrl(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postRegister, postLogin };
