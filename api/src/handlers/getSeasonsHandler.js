const getSeasonsController = require('../controllers/getSeasonsController.js');

const getSeasonsHandler = async (req, res) => {
  try {
    const seasons = await getSeasonsController();
    res.status(200).json(seasons);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getSeasonsHandler;
