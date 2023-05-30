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

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
