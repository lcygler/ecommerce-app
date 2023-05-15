const data = require('../utils/catalogFront.json');

const getCatalogController = async () => {
  return data;
};

module.exports = getCatalogController;
