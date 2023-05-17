const getGendersController = require('../controllers/getGendersController.js');

const getGendersHandler = async (req, res) => {
  try {
    const genders = await getGendersController();
    res.status(200).json(genders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getGendersHandler;
