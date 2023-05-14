const getCatalogController = require('../controllers/getCatalogController.js');

const getCatalogHandler = async (req, res) => {
  try {
    const catalog = await getCatalogController();
    res.status(200).json(catalog);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getCatalogHandler;
