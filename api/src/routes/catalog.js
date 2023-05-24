const { Router } = require('express');
const data = require('../utils/catalog.json');

const router = Router();

router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = data[parseInt(productId)];
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const catalog = data;
    res.status(200).json(catalog);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
