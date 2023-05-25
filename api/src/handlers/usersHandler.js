const { registerCtrl } = require('../controllers/userRegister');
const { loginCtrl } = require('../controllers/userLogin');
const { User } = require('../db');
const { Op } = require('sequelize');
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
  let registered = false;
  try {
    const { googleId, email, image, lastname, name } = req.body;

    // Verificar si el usuario existe en la base de datos
    const user = await User.findOne({
      where: {
        [Op.or]: [{ googleId }, { email }],
      },
    });
    if (user) {
      // Usuario registrado
      res.status(200).json( registered = true );
    } else {
      // Aquí puedes realizar la lógica para crear el usuario en la base de datos
       await User.create({ googleId, email, image, lastname, name });
      res.status(200).json( registered = false );
      
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postRegister, postLogin, google };
