const { Router } = require('express');
const { User, Product, Category, Season, Review } = require('../db.js');

const router = Router();

//* GET USER FAVORITES
router.get('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const favorites = await user.getProducts({
      where: {
        disable: false,
      },
      include: [Category, Season, Review],
    });

    // if (!favorites || favorites.length === 0) {
    //   throw new Error('Favorites not found');
    // }

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error retrieving favorites' });
  }
});

//* ADD FAVORITE
router.post('/:productId/users/:userId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    await user.addProduct(product);

    res.status(200).json({ message: 'Product added to favorites' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error adding favorite' });
  }
});

//* REMOVE FAVORITE
router.delete('/:productId/users/:userId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    await user.removeProduct(product);

    res.status(200).json({ message: 'Product removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error removing favorite' });
  }
});

//* CLEAR FAVORITES
router.delete('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await user.setProducts([]);

    res.status(200).json({ message: 'Favorites cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error clearing favorites' });
  }
});

module.exports = router;
