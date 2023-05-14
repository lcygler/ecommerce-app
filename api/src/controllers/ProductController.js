const {uploadImage} = require("../utils/cloudinary.js");
const { Product, Review, Category, Season } = require('../db');

const AddProducts = async (api) => {
  const productos = [];
  const temporadas = [];
  const categoria = [];

  // Crear registros para las categorías
  for (let i = 0; i < api.products.length; i++) {
    const product = api.products[i];
    for (let j = 0; j < product.Category.length; j++) {
      const category = product.Category[j];
      if (!categoria.includes(category.name)) {
        await Category.create({ name: category.name });
        categoria.push(category.name);
      }
    }
  }

  // Crear registros para las temporadas
  for (let i = 0; i < api.products.length; i++) {
    const product = api.products[i];
    for (let j = 0; j < product.seasons.length; j++) {
      const season = product.seasons[j];
      if (!temporadas.includes(season.name)) {
        await Season.create({ name: season.name });
        temporadas.push(season.name);
      }
    }
  }

  // Crear registros para los productos y establecer relaciones con categorías y temporadas
  for (let i = 0; i < api.products.length; i++) {
    const product = api.products[i];

    // Crear registro de producto
    const newProduct = await Product.create({
      name: product.name,
      size: product.size,
      gender: product.gender,
      description: product.description,
      price: product.price,
      discount: product.discount,
      views: product.views,
      stock: product.stock,
      image: product.image
    });
    productos.push(newProduct);

    // Establecer relaciones con categorías
    for (let j = 0; j < product.Category.length; j++) {
      const categoryName = product.Category[j].name;
      const category = await Category.findOne({ where: { name: categoryName } });
      await newProduct.addCategory(category);
    }

    // Establecer relaciones con temporadas
    for (let j = 0; j < product.seasons.length; j++) {
      const seasonName = product.seasons[j].name;
      const season = await Season.findOne({ where: { name: seasonName } });
      await newProduct.addSeason(season);
    }
    // Crear registros para las reviews y establecer relación con el producto
  for (let j = 0; j < product.reviews.length; j++) {
    const reviewData = product.reviews[j];
    const newReview = await Review.create({
      comment: reviewData.text,
      punctuation: reviewData.rating,
    });
    await newProduct.addReview(newReview);
  }
  }
};

const getAllProducts = async () => {
  const products = await Product.findAll({
    where: {
      disable: false
    },
    include: [
      {

        model: Season
      },
      {
        model: Category
      },
      {
        model: Review
      }
    ]
  });
  return products;
}



const createProduct = async (name, description, price, discounts, stock, image, Category, Season) => {
    try {
      const product = await Product.create({ name, description, price, discounts, stock, image });
  
      // Asociamos las categorías al producto
      await product.setCategories(Category);
  
      // Asociamos las temporadas al producto
      await product.setSeasons(Season);
  
      return product;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating product');
    }
  };


  const updateProduct = async (productId, productData) => {
    try {
      const product = await Product.findByPk(productId);
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      const updatedProduct = await product.update(productData);
  
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  const deleteProduct = async (productId) => {
    try {
      const product = await Product.findByPk(productId);
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      const disabledProduct = await product.update({ disable: true });
  
      return disabledProduct;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  AddProducts,
  deleteProduct

};
