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

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
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

    const updatedUser = await User.update(updateFields, {
      where: { id },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
      // include: [Review, Cart, Product, ShippingAddress],
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user' });
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
