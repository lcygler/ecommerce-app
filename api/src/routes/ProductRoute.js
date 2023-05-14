const { getAllProducts } = require('../controllers/ProductController');
const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;