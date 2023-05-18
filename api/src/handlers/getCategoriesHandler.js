const getCategoriesController = require('../controllers/getCategoriesController.js');

const getCategoriesHandler = async (req, res) => {
  try {
    const categories = await getCategoriesController();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getCategoriesHandler;
