const data = require('../utils/catalogFront.json');

const getCatalogByIdController = async (productId) => {
  return data[parseInt(productId)];
};

module.exports = getCatalogByIdController;
