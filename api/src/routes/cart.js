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

    console.log(cart);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Error retrieving user cart' });
  }
});

//* CREATE & UPDATE CART
router.post('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { products } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    let cart = await Cart.findOne({ where: { UserId: userId } });

    if (!cart) {
      const newCart = await Cart.create({ UserId: userId });

      for (const product of products) {
        const { id, price, discounts, quantity } = product;

        const discountedPrice = price * (1 - discounts);
        const subtotal = discountedPrice * quantity;

        const createdCartDetail = await CartDetail.create({
          CartId: newCart.id,
          price: discountedPrice,
          quantity,
          subtotal,
        });

        const prod = await Product.findByPk(id);
        await prod.addCartDetail(createdCartDetail);
        // await createdCartDetail.setProduct(id);

        cart = await Cart.findOne({
          where: { id: newCart.id },
          include: {
            model: CartDetail,
          },
        });

        res.status(201).json(cart);
      }
    } else {
      await CartDetail.destroy({ where: { CartId: cart.id } });

      for (const product of products) {
        const { id, price, discounts, quantity } = product;

        const discountedPrice = price * (1 - discounts);
        const subtotal = discountedPrice * quantity;

        const createdCartDetail = await CartDetail.create({
          CartId: cart.id,
          price: discountedPrice,
          quantity,
          subtotal,
        });

        const prod = await Product.findByPk(id);
        await prod.addCartDetail(createdCartDetail);
        // await createdCartDetail.setProduct(id);
      }

      cart = await Cart.findOne({
        where: { id: cart.id },
        include: {
          model: CartDetail,
        },
      });

      res.status(200).json(cart);
    }
  } catch (error) {
    console.log(error);
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

    const cartDetails = await CartDetail.findAll({
      where: { CartId: cart.id },
      include: { model: Product },
    });

    for (const cartDetail of cartDetails) {
      const product = cartDetail.Product;
      await product.removeCartDetail(cartDetail);
    }

    await CartDetail.destroy({ where: { CartId: cart.id } });

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Error deleting user cart' });
  }
});

module.exports = router;
