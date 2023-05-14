const {
  getAllProducts,
  createProduct,
  updateProduct,
} = require("../controllers/ProductController.js");


const getProductsHandler = async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.json(products);
  } catch (error) {
    next(error);
  }
};

// TODO
/*
const getProductByIdHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
*/

const createProductHandler = async (req, res, next) => {
  try {
    const { name, size, gender, description, price, stock, categories, seasons } = req.body;
    let imagePath;
    if (req.file) {
      imagePath = req.file.path;
    }
    const product = await createProduct(
      name,
      size,
      gender,
      description,
      price,
      stock,
      imagePath,
      categories,
      seasons
    );

    res.json({ message: "Product created", product });
  } catch (error) {
    next(error);
  }
};

// TODO
/*
const updateProductHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
*/


// TODO
/*
const deleteProductHandler = async (req, res) => {
  try {
  } catch (error) {
    next(error);
  }
};
*/
module.exports = {
  getProductsHandler,
  //getProductByIdHandler,
  createProductHandler,
  //updateProductHandler,
  //deleteProductHandler,
};
