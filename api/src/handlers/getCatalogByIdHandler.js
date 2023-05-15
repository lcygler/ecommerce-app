const getCatalogByIdController = require('../controllers/getCatalogController.js');

const getCatalogByIdHandler = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await getCatalogByIdController(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getCatalogByIdHandler;
