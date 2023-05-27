const { Router } = require('express');
const { Cart, CartDetail, Product, User } = require('../db.js');

const router = Router();

//* GET USER CART
router.get('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const cart = await Cart.findOne({
      where: { UserId: userId },
      include: {
        model: CartDetail,
        include: {
          model: Product,
        },
      },
    });

    if (!cart || !cart.CartDetails) {
      return res.status(200).json([]);
    }

    const formattedCart = cart.CartDetails.map((cartDetail) => ({
      id: cartDetail.Product.id,
      name: cartDetail.Product.name,
      price: cartDetail.Product.price,
      description: cartDetail.Product.description,
      gender: cartDetail.Product.gender,
      size: cartDetail.Product.size,
      image: cartDetail.Product.image,
      discounts: cartDetail.Product.discounts,
      stock: cartDetail.Product.stock,
      quantity: cartDetail.quantity,
    }));

    res.status(200).json(formattedCart);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error retrieving cart' });
  }
});

//* CREATE & UPDATE CART
router.post('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const products = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    let cart = await Cart.findOne({ where: { UserId: userId } });

    if (cart) {
      await CartDetail.destroy({ where: { CartId: cart.id } });
    } else {
      cart = await Cart.create({ UserId: userId });
    }

    let total = 0;

    for (const product of products) {
      const { id, price, discounts, quantity } = product;

      const discountedPrice = price * (1 - discounts);
      const subtotal = discountedPrice * quantity;

      total += subtotal;

      const createdCartDetail = await CartDetail.create({
        CartId: cart.id,
        price: discountedPrice,
        quantity,
        subtotal,
      });

      const prod = await Product.findByPk(id);
      await prod.addCartDetail(createdCartDetail);
    }

    cart.total = total;
    await cart.save();

    updatedCart = await Cart.findOne({
      where: { id: cart.id },
      include: {
        model: CartDetail,
      },
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error updating cart' });
  }
});

//* DELETE PRODUCTS FROM CART
router.delete('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const cart = await Cart.findOne({ where: { UserId: userId } });

    if (!cart) {
      throw new Error('Cart not found');
    }

    await CartDetail.destroy({ where: { CartId: cart.id } });

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error clearing cart' });
  }
});

module.exports = router;
