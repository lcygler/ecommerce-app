const cartController = require("../controllers/cartController.js");

const getCartHandler = async (req, res) => {
  const cartItems = await cartController.getCartItems(req);

  res.status(200).json({ cartItems });
};

const createCartHandler = async (req, res) => {
  await cartController.removeFromCart(req);

  const cartItems = await cartController.getCartItems(req);

  res.status(201).json({ cartItems });
};

module.exports = { getCartHandler, createCartHandler };
