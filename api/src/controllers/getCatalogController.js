const data = require('../utils/Product.json');

const getCatalogController = async () => {
  return data;
};

module.exports = getCatalogController;
