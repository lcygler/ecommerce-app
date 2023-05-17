const { Category } = require('../db.js');

const getCategoriesController = async () => {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw new Error('Error retrieving categories');
  }
};

module.exports = getCategoriesController;
