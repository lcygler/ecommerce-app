const {
  User,
  // Review,
  // Cart,
  // CartDetail,
  // PurchaseDetail,
  // Product,
  // ShippingAddress,
} = require('../db.js');
const { encrypt } = require('../utils/HashPassword.js');
const jwt = require('jsonwebtoken');
const {
  sendMailBaja,
  sendMailAlta,
  sendAdminWelcome,
  sendAdminRemoval,
} = require('../utils/mail.config.js');

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

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
      // include: [Review, Cart, Product, ShippingAddress],
    });

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updateFields = {
      ...req.body,
    };

    if (updateFields.password) {
      updateFields.password = await encrypt(updateFields.password);
    }

    const [numAffectedRows] = await User.update(updateFields, {
      where: { id },
    });

    if (numAffectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await User.findOne({
      where: { id },
    });

    const token = generateToken(updatedUser);
    res.status(200).json({ user: updatedUser, token });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.destroy({
      where: { id },
    });

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

//* USER ENABLED
const sendEnableUser = async (req, res) => {
  try {
    const { email } = req.body;
    sendMailAlta(email);
    res.status(200).json({ message: 'User enabled email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' });
  }
};

//* USER DISABLED
const sendDisableUser = async (req, res) => {
  try {
    const { email } = req.body;
    sendMailBaja(email);
    res.status(200).json({ message: 'User disabled email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' });
  }
};

//* ADD ADMIN
const sendAddAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    sendAdminWelcome(email);
    res.status(200).json({ message: 'Add admin email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' });
  }
};

//* REMOVE ADMIN
const sendRemoveAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    sendAdminRemoval(email);
    res.status(200).json({ message: 'Remove admin email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  sendEnableUser,
  sendDisableUser,
  sendAddAdmin,
  sendRemoveAdmin,
};
