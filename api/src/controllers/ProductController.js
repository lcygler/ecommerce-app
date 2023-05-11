const { where } = require('sequelize');
const { Product, Review, Categories, Seasons } = require('../db'); // Importamos los modelos que vamos a utilizar

async function getAllProducts() {
  const products = await Product.findAll({
    include: [
        {where: {
            disable: false
        }},
      { model: Review },
      { model: Categories },
      { model: Seasons }
    ]
  });
  return products;
};


const createProduct = async (name, description, price, stock, image, categories, seasons) => {
    try {
      const product = await Product.create({ name, description, price, stock, image });
  
      // Asociamos las categorías al producto
      await product.setCategories(categories);
  
      // Asociamos las temporadas al producto
      await product.setSeasons(seasons);
  
      return product;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating product');
    }
  };

  // Función para actualizar un producto
async function updateProduct(productId, productData) {
    try {
      // Buscamos el producto en la base de datos
      const product = await Product.findByPk(productId);
  
      // Si el producto no existe, lanzamos un error
      if (!product) {
        throw new Error('El producto no existe');
      }
  
      // Actualizamos los datos del producto
      await product.update(productData);
  
      // Devolvemos el producto actualizado
      return product;
    } catch (error) {
      throw error;
    }
  }
  

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct
};
